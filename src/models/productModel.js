class Product {
  constructor(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    thumbnails
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category || "Sin categoría";
    this.thumbnails = thumbnails || [];
  }

  getInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      thumbnail: this.thumbnail,
      code: this.code,
      stock: this.stock,
      category: this.category,
      thumbnails: this.thumbnails,
      status: this.status,
    };
  }

  static findById(id) {
    const productsData = require("./products.json");

    const productData = productsData.find((product) => product.id === id);
    if (productData) {
      return new Product(
        productData.id,
        productData.title,
        productData.description,
        productData.price,
        productData.thumbnail,
        productData.code,
        productData.stock,
        productData.category,
        productData.thumbnails
      );
    }
    return null;
  }
}

module.exports = Product;
