const express = require("express");
const app = express();
const port = 8080;

const ProductManager = require("./productManager");
const CartManager = require("./cartManager");

app.use(express.json());

const productRoutes = require("./productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./cartRoutes");
app.use("/api/carts", cartRoutes);

app.listen(port, () => {
  console.log(`Servidor Express ejecutando en el puerto ${port}`);
});
