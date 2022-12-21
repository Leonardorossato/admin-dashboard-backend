const express = require("express");
const GeneralController = require("../controllers/general.controller");
const router = express.Router();

router.get("/all", GeneralController.all);
router.get("/:email", GeneralController.getByEmail);
router.get("/:id", GeneralController.getById);

module.exports = router;
