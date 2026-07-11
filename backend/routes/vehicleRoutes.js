const express = require("express");
const router = express.Router();

const { createVehicle } = require("../controllers/vehicleController");
const { getVehicles } = require("../controllers/vehicleController");
const { searchVehicles } = require("../controllers/vehicleController");
const { updateVehicle } = require("../controllers/vehicleController");
const { deleteVehicle } = require("../controllers/vehicleController");
const { purchaseVehicle } = require("../controllers/vehicleController");
const { restockVehicle } = require("../controllers/vehicleController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createVehicle);
router.get("/", protect, getVehicles);
router.get("/search", protect, searchVehicles);
router.put("/:id", protect, adminOnly, updateVehicle);
router.delete("/:id", protect, adminOnly, deleteVehicle);
router.post("/:id/purchase", protect, purchaseVehicle);
router.post("/:id/restock", protect, adminOnly, restockVehicle);

module.exports = router;
