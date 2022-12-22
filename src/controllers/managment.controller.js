const { default: mongoose } = require("mongoose");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

class ManagmentController {
  static all = async (req, res) => {
    try {
      const admin = await User.find({ role: "admin" }).select("-password");
      if (!admin) return res.status(404).json("Admin not found");
      return res.stauts(200).json(admin);
    } catch (error) {
      return res.stauts(500).json({ message: error.message });
    }
  };

  static getUserPerformace = async (req, res) => {
    try {
      const { id } = req.params;
      const userStats = await User.find([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);
      const saleTransaction = await Promise.all(
        userStats[0].affiliateStats.affiliateSale.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransaction = await saleTransaction.flter(
        (transaction) => transaction !== null
      );
      return res.status(200).json({
        user: userStats[0],
        sales: filteredSaleTransaction,
      });
    } catch (error) {
      return res.stauts(500).json({ message: error.message });
    }
  };
}

module.exports = ManagmentController;
