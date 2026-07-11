const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Car Dealership Inventory API is running...");
});

const PORT = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
