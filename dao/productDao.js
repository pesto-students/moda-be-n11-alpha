const Product = require("../models/Product");
async function getOneProduct(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (ex) {
    throw new Error(ex.message);
  }
}
async function getALlProducts(limit = 30, skip = 0, color, size, text) {
  try {
    let query;
    if (color !== "") {
      query = {};
      query["color"] = { $in: [color] };
    }
    if (size !== "") {
      query = query ? query : {};
      query["size"] = { $in: [size] };
    }
    if (text !== "") {
      query = query ? query : {};
      query["name"] = { $regex: text };
    }
    let products;
    if (query) products = await Product.find(query).limit(limit).skip(skip);
    else products = await Product.find().limit(limit).skip(skip);
    return products;
  } catch (ex) {
    console.log(ex.message);
    throw ex;
  }
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
module.exports = {
  saveProduct,
  saveManyProduct,
  getALlProducts,
  getOneProduct,
};
