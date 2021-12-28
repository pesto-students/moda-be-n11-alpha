const mongoose = require("mongoose");
const homePageSchema = mongoose.Schema(
  {
    specialOffer: { type: String },
    SaleAndOffer: [
      {
        title: String,
        desc: String,
        img: String,
      },
    ],
    PopularCategories: [
      {
        title: String,
        img: String,
      },
    ],
    PopularProduct: [
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
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homePageSchema);
