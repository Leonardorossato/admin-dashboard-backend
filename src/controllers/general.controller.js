const OverallStat = require("../models/overall.stats.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

class GeneralController {
  static all = async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(403).json("User with this id not exists");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  };

  static getByEmail = async (req, res) => {
    try {
      const email = req.params;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(403).json("User with this email not exists");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  };

  static getDashboardsStats = async (req, res) => {
    try {
      const currentMonth = "December";
      const currentYear = 2022;
      const currentDay = "2022-12-21";

      const transactions = await Transaction.find()
        .limit(50)
        .sort({ createdOn: -1 });
      if (!transactions) return res.status(403).json("Transaction not exists");

      const overallStats = await OverallStat.find({ year: currentYear });
      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
      } = overallStats[0];

      const monthStats = await overallStats[0].monthlyData.find(({ month }) => {
        return month === currentMonth;
      });

      const todayStats = await overallStats[0].dailyData.find(({ data }) => {
        return data === currentDay;
      });

      return res.status(200).json({
        monthStats,
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        todayStats,
        salesByCategory,
      });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
  };
}

module.exports = GeneralController;
