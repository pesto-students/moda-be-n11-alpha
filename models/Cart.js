const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    email: { unique: true, type: String },
    products: [
      {
        id: { type: String },
        name: { type: String },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
