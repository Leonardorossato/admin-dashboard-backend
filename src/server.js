const express = require("express");
const server = express();
const cors = require("cors");
const path = require("path");
const helment = require("helmet");
const morgan = require("morgan");
const mongooseConnection = require("./connection/mongo.connection");
require("dotenv").config();
const PORT = process.env.PORT;

/*Server configuration*/
server.use(express.json());
server.use(helment());
server.use(helment.crossOriginResourcePolicy({ policy: "cross-origin" }));
server.use(morgan("common"));
server.use(
  cors({
    origin: "http://localhost:7000/api",
    methods: "CREATE, UPDATE, READ, DELETE",
  })
);
server.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*Server Routes*/


/*Mongo configuration*/
server.mongooseConnection = mongooseConnection;

server.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT} `);
});
