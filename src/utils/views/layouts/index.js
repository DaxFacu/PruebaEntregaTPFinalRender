document.getElementById("miBoton").addEventListener("click", function () {
  const cartId = this.getAttribute("data-cart-id");
  const productId = this.getAttribute("data-product-id");
  const formData = new FormData();
  formData.append("cartId", cartId);
  formData.append("productId", productId);
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Trabaja con la respuesta de tu servidor
    })
    .catch((error) => console.error("Error:", error));
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("botonGenerado")) {
    const cartId = this.getAttribute("data-cart-id");
    const productId = this.getAttribute("data-product-id");
    const formData = new FormData();
    formData.append("cartId", cartId);
    formData.append("productId", productId);
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var botonesCarrito = document.querySelectorAll(".botonCarrito");
  botonesCarrito.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var cartId = this.getAttribute("data-cart-id");
      var productId = this.getAttribute("data-product-id");
      agregarProductoAlCarrito(cartId, productId);
    });
  });
});
function agregarProductoAlCarrito(cartId, productId) {
  formData.append("cartId", cartId);
  formData.append("productId", productId);
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}
