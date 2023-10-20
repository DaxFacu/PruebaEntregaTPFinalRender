import { productsService } from "../services/products.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";

class ProductsController {
  findProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productFind = await productsService.findProduct(id);

      return res.status(201).json({
        status: "success",
        msg: "producto encontrado",
        data: productFind,
      });
    } catch (e) {
      CustomError.createError({
        name: "Product creation error",
        cause: "",
        message: "Error trying to create product",
        code: EErrors.CREATE_PRODUCT_ERROR,
      });
      req.logger.warn(
        "No se pudo encontrar el producto: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
    }
  };

  createProduct = async (req, res) => {
    try {
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      } = req.body;
      const productCreated = await productsService.createProduc(
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
      );
      req.logger.info(
        "Producto creado: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      return res.status(201).json({
        status: "success",
        msg: "product created",
        data: productCreated,
      });
    } catch (e) {
      CustomError.createError({
        name: "Product creation error",
        cause: "",
        message: "Error trying to create product",
        code: EErrors.CREATE_PRODUCT_ERROR,
      });
      req.logger.warn(
        "No se pudo crear el producto: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      // console.log(e);
      // return res.status(500).json({
      //   status: "error",
      //   msg: "something went wrong :(",
      //   data: {},
      // });
    }
  };

  Update = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      } = req.body;

      const productUptaded = await productsService.updateProduct(
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
      );
      return res.status(201).json({
        status: "success",
        msg: "product uptaded",
        data: productUptaded,
      });
    } catch (e) {
      //console.log(e);
      req.logger.warn(
        "No se pudo actualizar el producto: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };

  Delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await productsService.deleteProduct(id);

      req.logger.info(
        "Producto eliminado: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      return res.status(200).json({
        status: "success",
        msg: "product deleted",
        data: {},
      });
    } catch (e) {
      req.logger.warn(
        "No se pudo eliminar el producto: " +
          new Date().toLocaleTimeString() +
          new Date().getUTCMilliseconds()
      );
      //console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  };
}

export const productsController = new ProductsController();
