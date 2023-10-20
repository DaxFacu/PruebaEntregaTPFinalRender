import nodemailer from "nodemailer";
import __dirname from "./utils.js";
//guillermofergnani@gmail.com,
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
