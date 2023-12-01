const ProductManager = require("../productManager");
const productManager = new ProductManager("products.json");

const getProducts = (req, res) => {
  try {
    const { limit = 10, page = 1, sort } = req.query;

    let products = productManager.getProducts();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    products = products.slice(startIndex, endIndex);

    if (sort) {
      products.sort((a, b) => {
        return sort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    res.json({
      status: 'success',
      payload: products,
      totalPages: Math.ceil(productManager.getProducts().length / limit),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: endIndex < productManager.getProducts().length ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: endIndex < productManager.getProducts().length,
      prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: endIndex < productManager.getProducts().length ? `/products?limit=${limit}&page=${page + 1}` : null,
    });
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
    const updatedProduct = productManager.updateProduct(pid, updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado para actualizar :(" });
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
