const fs = require("fs");
const path = require("path");

const loadCarts = () => {
  const filePath = path.join(__dirname, "carts.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveCarts = (carts) => {
  const filePath = path.join(__dirname, "carts.json");
  const data = JSON.stringify(carts, null, 2);
  fs.writeFileSync(filePath, data);
};

const createCart = (req, res) => {
  const carts = loadCarts();
  const newCart = {
    id: `cart${carts.length + 1}`,
    products: [],
  };
  carts.push(newCart);
  saveCarts(carts);
  res.status(201).json(newCart);
};

const getCartById = (req, res) => {
  const { cid } = req.params;
  const carts = loadCarts();
  const cart = carts.find((cart) => cart.id === cid);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado :(" });
  }
};

const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const carts = loadCarts();
  const cart = carts.find((cart) => cart.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado :(" });
  }

  saveCarts(carts);
  res.json(cart);
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
