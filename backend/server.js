const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

/* Only connect to DB if not in test mode (test mode uses mongodb-memory-server) */
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

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

/* Only start server if not in test mode */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
