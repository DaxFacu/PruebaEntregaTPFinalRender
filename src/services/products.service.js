import { productsMongo } from "../DAO/mongo/products.mongo.js";

class ProductsService {
  getAllProducts = async () => {
    const products = await productsMongo.getAllProducts();
    return products;
  };

  async createProduc(
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
    const productCreated = await productsMongo.createProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      id
    );
    return productCreated;
  }

  async findProduct(id) {
    const productFind = await productsMongo.findProduct(id);
    return productFind;
  }

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
    const productUpdated = await productsMongo.updateProduct(
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
    return productUpdated;
  };

  deleteProduct = async (id) => {
    const deleted = await productsMongo.deleteProduct(id);
    return deleted;
  };
}

export const productsService = new ProductsService();
