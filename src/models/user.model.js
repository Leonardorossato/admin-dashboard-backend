import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 250,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 250,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
      max: 250,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: { type: Array, default: [] },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "usedr",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports= User;
