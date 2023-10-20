import { cartsService } from "../services/carts.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";

class CartsController {
  Create = async (req, res) => {
    //const cart = req.body;
    const createCart = await cartsService.createCart();

    //console.log("hello" + (await createCart).id);
    if (createCart) {
      req.logger.info(
        "Carrito creado: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      return res.status(201).json({
        msg: "Carrito creado ",
        data: {},
      });
    } else {
      CustomError.createError({
        name: "Cart creation error",
        cause: "",
        message: "Error trying to create cart",
        code: EErrors.CREATE_CART_ERROR,
      });
      // return res.status(400).json({
      //   msg: "No se pudo crear el carrito",
      //   data: {},
      // });
    }
  };

  GetAll = async (req, res) => {
    try {
      const getCart = await cartsService.getAllCarts({});

      return res.status(200).json({
        status: "success",
        msg: "Get cart",
        data: getCart,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  Find = async (req, res) => {
    try {
      const { cid } = req.params;

      const getCart = await cartsService.findCart(cid);

      return res.status(200).json({
        status: "success",
        msg: "Get cart",
        data: getCart,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  Update = async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      console.log(products);
      const cartUptaded = await cartsService.updateCart(cid, products);
      return res.status(201).json({
        status: "success",
        msg: "product uptaded",
        data: cartUptaded,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const addProduct = await cartsService.addProductToCart(cid, pid);
      return res.status(201).json({
        status: "success",
        msg: "add product",
        data: addProduct,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  updateQuantityItemCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      console.log(products);
      const cartUptaded = await cartsService.updateQuantityItemCart(
        cid,
        pid,
        quantity
      );
      return res.status(201).json({
        status: "success",
        msg: "product quantity uptaded",
        data: cartUptaded,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  deleteProductToCard = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const deleteCard = await cartsService.deleteProductToCard(cid, pid);

      return res.status(201).json({
        status: "success",
        msg: "delete productToCard",
        data: deleteCard,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  Delete = async (req, res) => {
    try {
      const { cid } = req.params;

      const deleteCard = await cartsService.deleteCard(cid);

      return res.status(201).json({
        status: "success",
        msg: "delete products card",
        data: deleteCard,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  purchase = async (req, res) => {
    try {
      const { cid } = req.params;

      const mail = req.user.mail;
      const purchaseTicket = await cartsService.purchase(cid, userName);

      return res.status(201).json({
        status: "success",
        msg: "delete products card",
        data: purchaseTicket,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };
}

export const cartsController = new CartsController();
