const router = require("express").Router();
const data = require("../myntra_fashion_products_free_dataset.json");
const Product = require("../models/Product");
router.get("/", (req, res) => {
  let unisex = [];
  data.forEach(async ({ name, description, images, brand, gender }, index) => {
    let product;
    if (gender === "Men" || gender === "Women") {
      if (index % 3 === 0) {
        product = new Product({
          name,
          description,
          images,
          brand,
          size: ["sm", "l"],
          color: ["yellow", "black", "white"],
          gender,
        });
      } else if (index % 7 == 0) {
        product = new Product({
          name,
          description,
          images,
          brand,
          size: ["sm", "l", "xl"],
          color: ["red", "green", "blue", "yellow", "black", "white"],
          gender,
        });
      } else {
        product = new Product({
          name,
          description,
          images,
          brand,
          size: ["sm", "l", "xl", "xxl", "xxl"],
          color: ["green", "blue", "yellow", "black"],
          gender,
        });
      }
      await product.save();
    }
  });

  return res.send("data is as follows");
});
module.exports = router;
