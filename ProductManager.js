const fs = require('fs');

class ProductManager {
  constructor(dataFile) {
    this.dataFile = dataFile;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.dataFile, data);
  }

  // ... otras funciones de ProductManager

}

module.exports = ProductManager;