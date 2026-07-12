const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
  res.send("Car Dealership Inventory API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
