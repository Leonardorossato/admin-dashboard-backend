const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "userId", required: true },
    cost: String,
    products: {
      type: [ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transactions", TransactionSchema);
module.exports = Transaction;
