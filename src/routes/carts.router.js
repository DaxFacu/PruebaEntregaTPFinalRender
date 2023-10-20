import express from "express";
import { cartsController } from "../controllers/carts.controllers.js";

export const routerCarts = express.Router();

routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: false }));

// const cartManager = new CartManager("cart.json");

routerCarts.post("/", cartsController.Create);

routerCarts.get("/", cartsController.GetAll);

routerCarts.get("/:cid", cartsController.Find);

routerCarts.put("/:cid", cartsController.Update);

routerCarts.put("/:cid/products/:pid", cartsController.addProductToCart);

routerCarts.put("/:cid", cartsController.updateQuantityItemCart);

routerCarts.delete("/:cid", cartsController.Delete);

routerCarts.delete("/:cid/products/:pid", cartsController.deleteProductToCard);

routerCarts.post("/:cid/purchase", cartsController.purchase);
