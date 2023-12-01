const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, default: 'Sin categoría' },
  thumbnails: { type: [String], default: [] },
});

const ProductModel = mongoose.model('Product', productSchema);

class Product {
  constructor({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category = 'Sin categoría',
    thumbnails = [],
  }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
  }

  async saveToDatabase() {
    try {
      const product = new ProductModel(this);
      await product.save();
    } catch (error) {
      throw new Error('Error al guardar el producto en la base de datos');
    }
  }

  static async findById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (product) {
        return new Product({
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          category: product.category,
          thumbnails: product.thumbnails,
        });
      }
      return null;
    } catch (error) {
      throw new Error('Error al buscar el producto en la base de datos');
    }
  }

  static async getAllProducts() {
    try {
      const products = await ProductModel.find();
      return products.map((product) => new Product({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        thumbnails: product.thumbnails,
      }));
    } catch (error) {
      throw new Error('Error al obtener todos los productos de la base de datos');
    }
  }

  async updateProduct() {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        this._id,
        { $set: this },
        { new: true }
      );

      if (updatedProduct) {
        return updatedProduct;
      }
      throw new Error('Producto no encontrado para actualizar');
    } catch (error) {
      throw new Error('Error al actualizar el producto en la base de datos');
    }
  }
}

module.exports = Product;
