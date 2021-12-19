const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    productId: String,
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    brand: { type: String },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
