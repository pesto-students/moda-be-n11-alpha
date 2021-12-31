const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    email: { type: String },
    products: [
      {
        productId: String,
        productName: String,
        quantity: Number,
      },
    ],
    amount: {
      type: Number,
    },
    address: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
