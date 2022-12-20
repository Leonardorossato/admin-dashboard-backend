const Product = require("../models/product.model");
const ProductStat = require("../models/products.stats.model");
const User = require("../models/user.model");

class UserController {
  static all = async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  };

  static getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      const stats = await Promise.all(
        products.map(async (product) => {
          const res = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            res,
          };
        })
      );
      return res.status(200).json(stats);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };
}

module.exports = UserController;
