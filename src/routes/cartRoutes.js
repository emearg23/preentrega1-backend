const express = require("express");
const router = express.Router();

const CartManager = require("./cartManager");

router.post("/", (req, res) => {
  try {
    const cart = CartManager.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito :/" });
  }
});

router.get("/:cid", (req, res) => {
  const cid = req.params.cid;

  try {
    const cart = CartManager.getCartById(cid);
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado :(" });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;

  try {
    CartManager.addProductToCart(cid, pid, quantity);
    res.json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al agregar el producto al carrito :/" });
  }
});

module.exports = router;
