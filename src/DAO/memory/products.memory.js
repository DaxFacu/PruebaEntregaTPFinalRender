export default class Products {
  constructor() {
    this.products = [];
  }

  getAllProducts = async () => {
    const products = await ProductModel.find();

    return products;
  };

  createProduct = async (
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
    id
  ) => {
    console.log(title);
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

  deleteProduct = async (id) => {
    const deleted = await ProductModel.deleteOne({ _id: id });
    return deleted;
  };
}
