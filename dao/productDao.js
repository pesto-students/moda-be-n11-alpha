const Product = require("../models/Product");
async function getOneProduct(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (ex) {
    throw new Error(ex.message);
  }
}
async function getALlProducts(
  limit = 30,
  skip = 0,
  color = "",
  size = "",
  text = "",
  gender = "",
  page = 1
) {
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
      query["name"] = { $regex: new RegExp(text, "i") };
    }
    if (gender !== "") {
      query = query ? query : {};
      query["gender"] = gender;
    }
    let products;
    if (query)
      products = await Product.find(query)
        .limit(limit)
        .skip(limit * (page - 1));
    else
      products = await Product.find()
        .limit(limit)
        .skip(limit * (page - 1));
    return products;
  } catch (ex) {
    throw ex;
  }
}

async function saveProduct(product) {
  try {
    const newproduct = new Product(product);
    const savedProduct = await newproduct.save();

    return savedProduct;
  } catch (ex) {}
}
async function saveManyProduct(products) {
  Product.insertMany(products)
    .then(function () {})
    .catch(function (error) {});
}
module.exports = {
  saveProduct,
  saveManyProduct,
  getALlProducts,
  getOneProduct,
};
