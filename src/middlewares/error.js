import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause);

  switch (error.code) {
    case EErrors.ROUTING_ERROR:
      res
        .status(404)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        code: error.code,
      });
      break;

    case EErrors.DATABASES_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    case EErrors.CREATE_PRODUCT_ERROR:
      res.status(400).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        code: error.code,
      });
      break;

    case EErrors.CREATE_CART_ERROR:
      res.status(400).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        code: error.code,
      });
      break;

    default:
      res.send({ status: "error", error: "Unhandled error" });
      break;
  }
};
