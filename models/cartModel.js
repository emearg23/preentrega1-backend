const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  async addProduct(productId, quantity) {
    const existingProduct = this.products.find(
      (product) => product.productId.toString() === productId.toString()
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.products.push({ productId, quantity });
    }

    await this.saveToDatabase();
  }

  async removeProduct(productId) {
    const index = this.products.findIndex(
      (product) => product.productId.toString() === productId.toString()
    );

    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveToDatabase();
    }
  }

  getProducts() {
    return this.products;
  }

  async saveToDatabase() {
    try {
      const existingCart = await CartModel.findById(this.id);

      if (existingCart) {
        existingCart.products = this.products;
        await existingCart.save();
      } else {
        await CartModel.create({
          _id: this.id,
          products: this.products,
        });
      }
    } catch (error) {
      throw new Error('Error al guardar el carrito en la base de datos');
    }
  }

  static async findById(id) {
    try {
      const cart = await CartModel.findById(id);
      if (cart) {
        const instance = new Cart(cart._id);
        instance.products = cart.products;
        return instance;
      } else {
        throw new Error(`Carrito con ID ${id} no encontrado`);
      }
    } catch (error) {
      throw new Error('Error al buscar el carrito en la base de datos');
    }
  }
}

module.exports = Cart;
