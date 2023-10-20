import { CartModel } from "./models/carts.model.js";

class CartsMongo {
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

  async updateQuantityItemCart(cid, pid, quantity) {}

  async deleteCard(cid) {
    const deleted = await CartModel.updateOne({ _id: cid }, { products: [] });
    return deleted;
  }

  async addProductToCart(cid, pid) {
    const productToCart = await CartModel.findOne({ _id: cid });

    console.log(productToCart);
    /*if (productToCart.products.find(pid)) {
      const deleted = await CartModel.updateOne(
        { _id: cid },
        { quantity: quantity + 1 }
      );
    } else {
      productToCart.products.push({ product: pid });
      console.log(productToCart.products);
      const updateCart = await CartModel.updateOne({ _id: cid }, productToCart);
      
    }*/

    const existingProduct = productToCart.products.find(
      (item) => item.product._id == pid
    );
    const existingIndex = productToCart.products.findIndex(
      (item) => item.product._id == pid
    );
    //console.log("existingProduct");

    if (existingProduct) {
      const existingProductIndex = "products." + existingIndex + ".quantity";
      const existingProductQuantity = existingProduct.quantity + 1;
      const updateCart = await CartModel.updateOne(
        { _id: cid },
        {
          $set: {
            [existingProductIndex]: existingProductQuantity,
          },
        }
      );
      // console.log(productToCart.products[0].product._id);
      console.log(existingProductIndex);
      return updateCart;
    } else {
      productToCart.products.push({ product: pid, quantity: 1 });
      const updateCart = await CartModel.updateOne({ _id: cid }, productToCart);
      return updateCart;
    }
  }

  async deleteProductToCart(cid, pid) {
    const deletedProduct = await CartModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: pid } } },
      { new: true }
    );
    return deletedProduct;
  }
}
//   async deleteProductCard(cid, pid) {
//     const deletedProduct = await CartModel.findOneAndUpdate({
//       cid,
//       "products.pid": pid,
//     });
//     return deletedProduct;
//   }
// }

export const cartsMongo = new CartsMongo();
