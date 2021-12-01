const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    productId: String,
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
