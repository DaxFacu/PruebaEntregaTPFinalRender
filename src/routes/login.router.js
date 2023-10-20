import express from "express";
import usertDTO from "../DAO/DTO/user.dto.js";
//import { UserModel } from "../DAO/mongo/models/users.model.js";
import { isValidPassword, createHash } from "../utils/utils.js";
import passport from "passport";
import { usersController } from "../controllers/users.controller.js";
import { userService } from "../services/users.service.js";

export const loginRouter = express.Router();

// loginRouter.get("/", async (req, res) => {
//   res.send("hola mundo");
// });

loginRouter.get("/session", (req, res) => {
  return res.send(JSON.stringify(req.session));
});

loginRouter.get("/register", (req, res) => {
  return res.render("register", {});
});

loginRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    if (!req.user) {
      return res.status(400).render("error-page", {
        msg: "faltan datos",
        link: "/register",
        textLink: "Volver al registro",
      });
    }

    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
      cart: req.user.cart,
    };

    return res.redirect("/products"); //res.json({ msg: "ok", payload: req.user });
  }
);

loginRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }

    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
    };

    const date = new Date().getDate().toString().padStart(2, "0");
    console.log(date);
    userService.updateDateLoginUser(req.user._id, date);
    //console.log(userService.updateDateLoginUser(req.user._id, date));
    return res.redirect("/products"); //res.json({ msg: "ok", payload: req.user });
  }
);

loginRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("error-page", {
        msg: "no se pudo cerrar la session",
        link: "/products",
        textLink: "Volver a productos",
      });
    }
    return res.redirect("/login");
  });
});

loginRouter.use("/current", (req, res) => {
  const user = usertDTO.UsertDTO;
  return res.status(200).json({
    status: "success",
    msg: "datos de la session",
    payload: user || {}, //req.session.user || {},
  });
});
