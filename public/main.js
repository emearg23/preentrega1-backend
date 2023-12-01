// Declaración de la variable products con algunos datos de ejemplo
const products = [
  { id: 1, title: "Producto 1", price: 19.99, thumbnail: "url_producto_1.jpg" },
  { id: 2, title: "Producto 2", price: 29.99, thumbnail: "url_producto_2.jpg" },
  // ... más productos ...
];

// Llama a la función para renderizar la lista al cargar la página
window.onload = function () {
  renderProductList(products);
};

function renderProductList(products) {
  const productListElement = document.getElementById("productList");

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const thumbnail = document.createElement("img");
    thumbnail.className = "product-thumbnail";
    thumbnail.src = product.thumbnail;
    thumbnail.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `Precio: $${product.price.toFixed(2)}`;

    productCard.appendChild(thumbnail);
    productCard.appendChild(title);
    productCard.appendChild(price);

    productListElement.appendChild(productCard);
  });
}

// Llama a la función para renderizar la lista al cargar la página
window.onload = function () {
  renderProductList(products);
};