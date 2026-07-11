const express = require("express");
const router = express.Router();

const { createVehicle } = require("../controllers/vehicleController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createVehicle);

module.exports = router;
