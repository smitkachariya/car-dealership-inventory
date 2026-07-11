const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", protect, (req, res) => {
  res.json(req.user);
}); //this is only for the testing purpose to check if the token is working or not

router.get("/admin", protect, adminProtect, (req, res) => {
  res.json({ message: "Admin access granted" });
}); //this is only for the testing purpose to check if the token is working or not
module.exports = router;
