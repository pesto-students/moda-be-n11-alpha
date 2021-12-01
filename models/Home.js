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
        img: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homePageSchema);
