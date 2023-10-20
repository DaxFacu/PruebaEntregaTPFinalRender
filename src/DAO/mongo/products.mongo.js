import { ProductModel } from "./models/products.model.js";

// export default
class ProductsMongo {
  constructor() {}

  getAllProducts = async () => {
    const products = await ProductModel.find();

    return products;
  };

  async createProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
    id
  ) {
    console.log("title");
    const productCreated = await ProductModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      id,
    });
    return productCreated;
  }

  findProduct = async (id) => {
    const productFind = await ProductModel.findOne({ _id: id });

    return productFind;
  };

  updateProduct = async (
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) => {
    const productUpdated = await ProductModel.updateOne(
      { _id: id },
      { title, description, code, price, status, stock, category, thumbnail }
    );
    return productUpdated;
  };

  updateStockProduct = async (id, stock) => {
    const productStockUpdated = await ProductModel.updateOne(
      { _id: id },
      { stock }
    );
    return productStockUpdated;
  };

  deleteProduct = async (id) => {
    const deleted = await ProductModel.deleteOne({ _id: id });
    return deleted;
  };
}

export const productsMongo = new ProductsMongo();
