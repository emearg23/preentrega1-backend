const express = require("express");
const router = express.Router();
const productManager = require("../ProductManager.js");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos :/" });
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Producto no encontrado :(" });
  }
});

router.post("/", async (req, res) => {
  const productData = req.body;

  try {
    const product = await productManager.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "No se pudo agregar el producto :(" });
  }
});

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(pid, updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Producto no encontrado para actualizar :(" });
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  try {
    await productManager.deleteProduct(pid);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Producto no encontrado para eliminar :(" });
  }
});

module.exports = router;
