
const express = require("express");

const app = express();

const ProductController = require("./controllers/product.controller");

app.use(express.json());

app.use("/products", ProductController);

module.exports = app;