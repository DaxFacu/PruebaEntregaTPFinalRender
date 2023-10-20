import { cartsMongo } from "../DAO/mongo/carts.mongo.js";
import { ticketMongo } from "../DAO/mongo/ticket.mongo.js";
import { productsMongo } from "../DAO/mongo/products.mongo.js";

class CartsService {
  getAllCarts = async () => {
    const carts = await cartsMongo.getAllCarts();
    return carts;
  };

  createCart = async () => {
    const cartCreated = await cartsMongo.createCart({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  };

  findCart = async (id) => {
    const cartFind = await cartsMongo.findCart(id);
    return cartFind;
  };

  updateCart = async (cid, products) => {
    const cartUpdated = await cartsMongo.updateCart(cid, products);
    return cartUpdated;
  };

  updateQuantityItemCart = async (cid, pid, quantity) => {
    const cartQuantityUpdated = await cartsMongo.updateQuantityItemCart(
      cid,
      pid,
      quantity
    );
    return cartQuantityUpdated;
  };

  addProductToCart = async (cid, pid) => {
    const productToCart = await cartsMongo.addProductToCart(cid, pid);
    return productToCart;
  };

  deleteProductsCard = async (cid) => {
    const deleted = await cartsMongo.deleteProductsCard(cid);
    return deleted;
  };

  deleteCard = async (cid) => {
    const deleted = await cartsMongo.deleteCard(cid);
    return deleted;
  };

  purchase = async (cid, userMail) => {
    console.log(await cartsMongo.findCart(cid));
    const code = Date.now() + Math.floor(Math.random() * 10000 + 1);
    const purchase_datatime = Date.now();
    const amountCart = await cartsMongo.findCart(cid);
    let amountCartS = amountCart.products.map((product) => {
      return {
        title: product.product.title,
        description: product.product.description,
        stock: product.product.stock,
        price: product.product.price,
        id: product.product._id,
        quantity: product.quantity,
      };
    });
    /*const amountS = amountCart.reduce((sum, product) => {
      sum += product.price;
      return sum;
    }, 0);*/
    const products = [];

    //console.log("productsAll");
    //console.log(amountCart.products[0]._id);
    // console.log(amountCartS);

    /*const productosFiltrados = amountCart.products.filter(
      (product) => product.price > 1.5
    );*/
    console.log("inicio");

    console.log("productosCarrito");
    console.log(amountCart.products);

    /* console.log("productosCarritoS");
    console.log(amountCart.products[0].quantity);
*/
    // console.log("productosProductos");
    //console.log(products);
    //console.log(amountCart.products[0].product._id);
    console.log("Fin");

    /* const productos = await productsMongo.findProduct(
      amountCart.products[0].product._id
    );
    console.log(productos);
*/
    for (let i = 0; i < amountCart.products.length; i++) {
      const productos = await productsMongo.findProduct(
        amountCart.products[i].product._id
      );
      //console.log(productos);

      if (amountCart.products[i].quantity <= productos.stock) {
        products.push(amountCart.products[i]);
        await cartsMongo.deleteProductToCart(cid, amountCart.products[i]._id);
        await productsMongo.updateStockProduct(
          productos._id,
          productos.stock - amountCart.products[i].quantity
        );
      } else {
      }
    }

    console.log("productosProductos");
    console.log(products);
    //console.log(amountCart.products.length);
    /*const productosFiltrados = amountCart.products.filter((item1) =>
      products.some((item2) => item1.quantity < item2.stock)
    );*/
    /*console.log("productosFiltrados");
    console.log(productosFiltrados);*/

    const amountS = amountCartS.reduce((sum, producto) => {
      return sum + producto.price;
    }, 0);

    const amount = amountS;
    /* console.log("amount");
    console.log(amountCartS);
    console.log(amountS);
*/
    const purchaser = userMail;
    const purchase = await ticketMongo.createTicket(
      code,
      purchase_datatime,
      amount,
      purchaser
    );
    return purchase;
  };

  async deleteProductToCard(cid, pid) {
    const deletedProduct = await cartsMongo.deleteProductToCart(cid, pid);
    return deletedProduct;
  }
}

export const cartsService = new CartsService();
