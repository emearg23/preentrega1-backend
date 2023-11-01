const express = require("express");
const router = express.Router();

const ProductManager = require("./productManager");

router.get("/", (req, res) => {
  try {
    const products = ProductManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos :/" });
  }
});

router.get("/:pid", (req, res) => {
  const pid = req.params.pid;

  try {
    const product = ProductManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado :(" });
  }
});

module.exports = router;
