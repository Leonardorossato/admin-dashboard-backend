const Product = require("../models/product.model");
const ProductStat = require("../models/products.stats.model");

class ClientController {
  static all = async (req, res) => {
    try {
      const products = await Product();
      if (!products) return res.status(500).json("Product not found");
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      const productStats = await Promise.all(
        products.map(async (product) => {
          const stats = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stats,
          };
        })
      );
      return res.status(200).json(productStats);
    } catch (error) {}
  };
}

module.exports = ClientController;
