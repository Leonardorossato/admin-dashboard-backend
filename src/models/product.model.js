const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    supply: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
