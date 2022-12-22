const OverallStat = require("../models/overall.stats.model");

class SalesController {
  static all = async (req, res) => {
    try {
      const sales = await OverallStat.find();
      return res.status(200).json(sales);
    } catch (error) {
      return res.stauts(500).json({ message: error.message });
    }
  };

  static getSales = async (req, res) => {
    try {
      const overallStats = await OverallStat.find();
      return res.staus(200).json(overallStats[0]);
    } catch (error) {
      return res.stauts(500).json({ message: error.message });
    }
  };
}

module.exports = SalesController;
