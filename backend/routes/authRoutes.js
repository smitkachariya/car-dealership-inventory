const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
