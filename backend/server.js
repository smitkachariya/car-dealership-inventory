const express = require("express");

const app = express();
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Car Dealership Inventory API is running...");
});
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
