const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const AffiliateStatSchema = new Mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "users", required: true },
    affiliateSales: {
      type: [ObjectId],
      ref: "transactions",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
module.exports = AffiliateStat;
