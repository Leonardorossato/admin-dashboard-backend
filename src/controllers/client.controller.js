const Product = require("../models/product.model");
const ProductStat = require("../models/products.stats.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

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
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getCustomeres = async (req, res) => {
    try {
      const customers = await User.find({ role: "user" }).select("-password");
      if (!customers) return res.status(403).json("Customeres not found");
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getTransactions = async (req, res) => {
    try {
      const { page = 1, pagSize = 20, sort = null, search = null } = req.query;
      const generateSort = () => {
        const parsed = JSON.parse(sort);
        const formatted = {
          [parsed.field]: [(parsed.sort = "asc" ? 1 : -1)],
        };
        return formatted;
      };
      const sortFomatted = Boolean(sort) ? generateSort() : {};
      const transactions = await Transaction.find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFomatted)
        .skip(page * pagSize)
        .limit(pagSize);
      const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i" },
      });
      return res.stats(200).json({
        transactions,
        total,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };
}

module.exports = ClientController;
