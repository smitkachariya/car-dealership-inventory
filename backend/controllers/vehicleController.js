const Vehicle = require("../models/Vehicle");

const createVehicle = async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price,
      quantity,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
};
