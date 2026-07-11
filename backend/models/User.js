const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, //user name will be stored as a string
      required: true,
    },
    email: {
      type: String, //user email will be stored as a string
      required: true,
      unique: true,
    },
    password: {
      type: String, //user password will be stored as a string
      required: true,
    },
    role: {
      type: String, //user default role is the user we dont pass the role in the authentication
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
