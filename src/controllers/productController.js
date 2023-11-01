const ProductManager = require("../productManager");
const productManager = new ProductManager("products.json");

const getProducts = (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let products = productManager.getProducts();

    if (!isNaN(limit) && limit > 0) {
      products = products.slice(0, limit);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos :/" });
  }
};

const getProductById = (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    const product = productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado :(" });
  }
};

const addProduct = (req, res) => {
  const productData = req.body;

  try {
    const product = productManager.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "No se pudo agregar el producto :(" });
  }
};

const updateProduct = (req, res) => {
  const pid = parseInt(req.params.pid);
  const updatedProductData = req.body;

  try {
    const updatedProduct = productManager.updateProduct(
      pid,
      updatedProductData
    );
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(404)
      .json({ error: "Producto no encontrado para actualizar :(" });
  }
};

const deleteProduct = (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    productManager.deleteProduct(pid);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado para eliminar :(" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
