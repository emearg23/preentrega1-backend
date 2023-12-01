const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/tu_base_de_datos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos desde MongoDB :/" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express ejecutando en el puerto ${port}`);
});