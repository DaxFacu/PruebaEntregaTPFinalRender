import * as fs from "fs";

export class ProductManager {
  #maxId = 0;
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
  }
  //Creación de productos
  addProduct(product) {
    let newProduct = {
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      thumbnail: product.thumbnail,
      id: this.#generateId(),
    };

    if (this.codeVerification(newProduct)) {
      console.log(
        "El codigo del producto que se intenta agregar está repetido"
      );
    } else {
      if (this.fieldVerification(newProduct)) {
        console.log(
          "Algún elemento del nuevo producto está vacio o no es correcto, el producto no se agregó"
        );
      } else {
        ++this.#maxId;
        this.writeProducts(newProduct);
        return newProduct;
      }
    }
  }

  codeVerification(product) {
    const readProducts = this.getProducts();
    const verifCode = readProducts.some(
      (codeProduct) => codeProduct.code === product.code
    );
    return verifCode;
  }

  fieldVerification(product) {
    const verificationField = Object.values(product).every(
      (value) => value !== null && value !== "" && value !== undefined
    );
    return !verificationField;
  }

  writeProducts(product) {
    const readFile = fs.readFileSync(this.path, "utf-8");
    const readFileArray = JSON.parse(readFile);
    const newArray = readFileArray;
    newArray.push(product);
    fs.writeFileSync(this.path, JSON.stringify(newArray));
  }

  getProducts() {
    const readFile = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(readFile);
  }

  #generateId() {
    return this.#maxId;
  }

  getProductById(id) {
    const readFile = this.getProducts();
    const findProductById = readFile.find((product) => product.id === id);
    return findProductById ? findProductById : console.log("Not Found");
  }

  updateProduct(id, value) {
    const readFile = this.getProducts();
    let findObject = readFile.find((obj) => obj.id === id);

    if (findObject) {
      if (this.codeVerification(value)) {
        return console.log("Codigo repetido");
      } else if (this.fieldVerification(value)) {
        return console.log("Algún campo es inválido");
      } else {
        let productData = { ...value, id };
        let remplaceObject = readFile.splice(id, 1, productData);
        fs.writeFileSync(this.path, JSON.stringify(readFile));
        return remplaceObject;
      }
    } else {
      return "id invalid";
    }
  }

  deleteProduct(id) {
    const readFile = this.getProducts();
    let findObject = readFile.find((obj) => obj.id === id);
    if (findObject) {
      const filterObject = readFile.filter((obj) => obj.id !== id);

      fs.writeFileSync(this.path, JSON.stringify(filterObject));
      return filterObject;
    } else {
      return console.log("Producto no encontrado");
    }
  }
}
