import express from "express";
import { productsController } from "../controllers/products.controllers.js";
import { ProductModel } from "../DAO/mongo/models/products.model.js";
import { checkAdmin } from "../middlewares/auth.js";

export const routerProducts = express.Router();

routerProducts.get("/", async (req, res) => {
  try {
    const { page, limit, category, status, sort } = req.query;

    var querySelect = undefined;
    if (category) {
      querySelect = { category: category };
    } else if (status) {
      querySelect = { status: status };
    } else {
      querySelect = undefined;
    }
    console.log(querySelect);
    const products = await ProductModel.paginate(
      { ...querySelect },
      {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort },
      }
    );
    return res.status(200).json({
      status: "success",

      payload: products,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      // prevLink: products.prevLink,
      // nextLink: products.nextLink,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerProducts.post("/", checkAdmin, productsController.createProduct);

routerProducts.get("/:id", productsController.findProduct);

routerProducts.put("/:id", checkAdmin, productsController.Update);

routerProducts.delete("/:id", checkAdmin, productsController.Delete);
