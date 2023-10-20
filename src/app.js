import express from "express";
import handlebars from "express-handlebars";
import { ProductManager } from "./ProductManager.js";
// import { CartManager } from "./CartManager.js";
import { routerProducts } from "./routes/products.router.js";
import { routerCarts } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { routerUsers } from "./routes/users.router.js";
import { loginRouter } from "./routes/login.router.js";
import { Server } from "socket.io";
import { __dirname } from "./utils/utils.js";
import { connectMongo } from "./utils/conection.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import FileStore from "session-file-store";
const FileStoreSession = FileStore(session);
import { iniPassport } from "./config/passport.config.js";
import passport from "passport";
import { entorno } from "./config/config.js";
import { generateProducts } from "./utils/generateProducts.js";
import errorHandler from "./middlewares/error.js";
import { addLogger } from "./utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import nodemailer from "nodemailer";

const app = express();
const port = 8080;
app.use(addLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectMongo();
console.log(entorno);
const productManager = new ProductManager("Products.json");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://facundolasta:Mn1EJoLYsEyEsZPg@back-test.otvhkve.mongodb.net/?retryWrites=true&w=majority",
      ttl: 86400 * 7,
    }),
    secret: "un-re-secreto",
    resave: true,
    saveUninitialized: true,
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion back",
      description: "Documentación de productos y carrito",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/products", routerProducts);

app.use("/api/carts", routerCarts);

app.use("/api/users", routerUsers);

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

export const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

socketServer.on("connection", (socket) => {
  console.log("Cliente conectado");
  const products = productManager.getProducts();
  socket.emit("realtimeproducts", products);
});

app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter);
app.use("/products", viewsRouter);
app.use("/api/sessions", loginRouter);
app.use(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/api/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login-form" }),
  (req, res) => {
    req.session.user = req.user;

    // Successful authentication, redirect home.

    res.redirect("/products");
  }
);

app.get("/mockingproducts", async (req, res) => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    products.push(generateProducts());
  }

  res.send({ status: "success", payload: products });
});

//logger
app.get("/loggerTest", async (req, res) => {
  req.logger.silly(
    "silly: " +
      new Date().toLocaleTimeString() +
      new Date().getUTCMilliseconds()
  );
  req.logger.debug(
    "Debug: " +
      new Date().toLocaleTimeString() +
      new Date().getUTCMilliseconds()
  );
  req.logger.verbose(
    "Verbose: " +
      new Date().toLocaleTimeString() +
      new Date().getUTCMilliseconds()
  );
  req.logger.http(
    "Http: " + new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
  );
  req.logger.info(
    "Info: " + new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
  );
  req.logger.warn(
    "Warn: " + new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
  );
  req.logger.error(
    "Error: " +
      new Date().toLocaleTimeString() +
      new Date().getUTCMilliseconds()
  );
});

//Cart
app.use("/carts", viewsRouter);

//Mail

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

app.get("/mail", async (req, res) => {
  const result = await transport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: "daxfacu@gmail.com", //"francoivangalluccio@gmail.com, medina.juaan@gmail.com, fersimizu@gmail.com, joaquin.perez.coria@gmail.com, pgaman58@gmail.com",
    subject: "F - Mail de ejemplo 51395",
    html: `
              <div>
                  <h1>La mejor camada 51395!</h1>
                  <p>pero un poco silenciosa.... hay que hablar un poco mas!!!!</p>
                  <img src="cid:image1" />
              </div>
          `,
    attachments: [
      {
        filename: "image1.gif",
        path: __dirname + "/images/image1.gif",
        cid: "image1",
      },
    ],
  });

  console.log(result);
  res.send("Email sent");
});

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Página no encontrada" });
});

app.use(errorHandler);
