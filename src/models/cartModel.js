class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  addProduct(productId, quantity) {
    const existingProduct = this.products.find(
      (product) => product.productId === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.products.push({ productId, quantity });
    }
  }

  removeProduct(productId) {
    const index = this.products.findIndex(
      (product) => product.productId === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  getProducts() {
    return this.products;
  }

  static findById(id) {
    const cart = carts.find((cart) => cart.id === id);
    if (cart) {
      return cart;
    } else {
      throw new Error(`Carrito con ID ${id} no encontrado`);
    }
  }
}

module.exports = Cart;
