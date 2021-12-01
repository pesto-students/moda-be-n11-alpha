const Product = require("../models/Product");

async function getALlProducts(limit = 0, skip = 0, sort = "") {
  try {
    const products = await Product.find().limit(limit).skip(skip);
    console.log(products);
    return products;
  } catch (ex) {}
}

async function saveProduct(product) {
  try {
    const newproduct = new Product(product);
    const savedProduct = await newproduct.save();
    console.log(savedProduct);
    return savedProduct;
  } catch (ex) {
    console.log(ex.message);
  }
}
async function saveManyProduct(products) {
  Product.insertMany(products)
    .then(function () {
      console.log("Data inserted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
}
module.exports.saveProduct = saveProduct;
module.exports.saveManyProduct = saveManyProduct;
module.exports.getALlProducts = getALlProducts;
