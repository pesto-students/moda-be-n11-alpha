const Cart = require("../models/Cart");

const findCart = async (email) => {
  try {
    const cart = await Cart.findOne({ email });
    return cart;
  } catch (e) {}
};

const createCartForNewUser = async (email, product) => {
  let newCart = new Cart({ email, products: [product] });
  await newCart.save();
  return newCart;
};

module.exports = { findCart, createCartForNewUser };
