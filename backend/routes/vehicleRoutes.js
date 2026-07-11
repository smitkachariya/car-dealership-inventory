const express = require("express");
const router = express.Router();

const { createVehicle } = require("../controllers/vehicleController");
const { getVehicles } = require("../controllers/vehicleController");
const { searchVehicles } = require("../controllers/vehicleController");
const { updateVehicle } = require("../controllers/vehicleController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createVehicle);
router.get("/", protect, getVehicles);
router.get("/search", protect, searchVehicles);
router.put("/:id", protect, adminOnly, updateVehicle);

module.exports = router;
