const mongoose = require("mongoose");
const otpSchema = mongoose.Schema(
  {
    email: String,
    otp: String,
    expiresIn: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Otp", otpSchema);
