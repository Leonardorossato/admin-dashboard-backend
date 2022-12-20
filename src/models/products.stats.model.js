const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ProductStatSchema = new mongoose.Schema(
  {
    productId: { type: ObjectId, ref: "productId", required: true },
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: { type: Number },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("productsStats", ProductStatSchema);
module.exports = ProductStat;
