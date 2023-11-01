class CartManager {
  constructor() {
    this.carts = [];
  }

  createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  getCartById(cartId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    if (!cart) {
      throw new Error(`Carrito con ID ${cartId} no encontrado`);
    }
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const existingProduct = cart.products.find(
      (product) => product.productId === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  generateUniqueId() {
    const currentTimestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${currentTimestamp}-${randomSuffix}`;
  }
}

module.exports = new CartManager();
