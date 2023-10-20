import * as fs from "fs";
import { ProductManager } from "./ProductManager.js";
const productManager = new ProductManager("Products.json");

export class CartManager {
  #maxId = 0;
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
  }

  addCart(id) {
    let newCart = {
      id: this.#generateId(),
      products: [],
    };

    this.writeCarts(newCart);
    return newCart;
  }

  writeCarts(product) {
    const readFile = fs.readFileSync(this.path, "utf-8");
    const readFileArray = JSON.parse(readFile);
    const newArray = readFileArray;
    newArray.push(product);
    fs.writeFileSync(this.path, JSON.stringify(newArray));
    this.#maxId++;
  }

  getCarts() {
    const readFile = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(readFile);
  }

  #generateId() {
    return this.#maxId;
  }

  getCartById(id) {
    const readFile = this.getCarts();
    const findCartById = readFile.find((cart) => cart.id === id);
    return findCartById ? findCartById : console.log("Cart Not Found");
  }

  getCartProducts(id) {
    const findCartById = this.getCartById(id);
    if (findCartById) {
      const cartProducts = findCartById.products;
      console.log(cartProducts);
      return cartProducts ? cartProducts : console.log("Products not found");
    }
  }

  addProductToCart(cartId, productId) {
    const readCarts = this.getCarts();
    const cart = this.getCartById(cartId);
    const findProduct = productManager.getProductById(productId);

    if (findProduct && cart) {
      const findproductCartById = cart.products.find(
        (product) => product.product === productId
      );
      console.log(findproductCartById);
      if (findproductCartById) {
        const quantity = findproductCartById.quantity + 1;
        const productaddQuantity = {
          product: findProduct.id,
          quantity: quantity,
        };
        cart.products.splice(
          cart.products.indexOf(findproductCartById.product),
          1,
          productaddQuantity
        );
      } else {
        cart.products.push({ product: findProduct.id, quantity: 1 });
      }

      let remplaceCart = readCarts.splice(cartId, 1, cart);
      fs.writeFileSync(this.path, JSON.stringify(readCarts));
      return remplaceCart;
    } else {
      return "no se encontró el id del producto o del carrito";
    }
  }
}
