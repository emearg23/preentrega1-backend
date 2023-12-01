const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const createCart = async (req, res) => {
  try {
    const cart = new Cart();
    await cart.saveToDatabase();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito :/' });
  }
};

const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado :(' });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cid);
    const product = await Product.findById(pid);

    if (!cart || !product) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado :(' });
    }

    await cart.addProduct(product.id, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito :/' });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
