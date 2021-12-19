const router = require("express").Router();
const data = require("../myntra_fashion_products_free_dataset.json");
const Product = require("../models/Product");
router.get("/", (req, res) => {
  console.log(data.length);
  let unisex = [];
  data.forEach(async ({ name, description, images, brand, gender }, index) => {
    let product;
    if (gender === "Men") {
      if (index % 5 === 0) {
        product = new Product({
          name,
          description,
          images,
          brand,
          size: ["sm", "l"],
          color: ["green", "pink"],
        });
      } else {
        product = new Product({
          name,
          description,
          images,
          brand,
          size: ["sm", "l", "xl", "xxl", "xxl"],
          color: ["red", "blue"],
        });
      }
      await product.save();
    }
  });
  return res.send("data is as follows");
});
