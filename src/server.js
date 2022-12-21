const express = require("express");
const server = express();
const cors = require("cors");
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

/*Server Routes*/
app.use('/api/client', clientRoutes)
app.use('/api/general', generalRoutes)
app.use('/api/management', managementRoutes)
app.use('/api/sales', salesRoutes)

/*Mongo configuration*/
server.mongooseConnection = mongooseConnection;

server.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT} `);
});
