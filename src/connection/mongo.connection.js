const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Conenction with mongoDB successfully.");
  })
  .catch((error) => {
    throw new Error("Erro to connect with MongoDB.", error);
  });
