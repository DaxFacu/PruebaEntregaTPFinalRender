const socket = io();

socket.on("realtimeproducts", (produc) => {
  console.log(produc);
  let divAllProducts = document.getElementById("productsId");
  divAllProducts.innerHTML = "";
  if (Array.isArray(produc)) {
    produc.forEach((item) => {
      divAllProducts.innerHTML += `<div style="padding: 10px;">
            <p> Nombre del producto: ${item.title}</p>
            <p> Descripción: ${item.description}</p>
            <p> Precio: ${item.price}</p>
            </div>`;
    });
  }
});
