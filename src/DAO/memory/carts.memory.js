export default class Products {
  constructor() {
    this.products = [];
  }

  async getAllCarts() {
    const carts = await CartModel.find();
    return carts;
  }

  async createCart() {
    const cartCreated = await CartModel.create({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  }

  async findCart(id) {
    const cartFind = await CartModel.findOne({ _id: id });
    return cartFind;
  }

  async updateCart(cid, products) {
    const cartUpdated = await CartModel.updateOne(
      { _id: cid },
      { products: { ...products } }
    );
    return cartUpdated;
  }

  async deleteProductsCard(cid) {
    const deleted = await CartModel.updateOne({ _id: cid }, { products: {} });
    return deleted;
  }

  async deleteCard(cid) {
    const deleted = await CartModel.deleteOne({ _id: cid });
    return deleted;
  }
}
