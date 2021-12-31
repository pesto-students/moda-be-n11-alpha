const Order = require("../models/Order");
const User = require("../models/User");
const createOrder = async (email, products = [], totalAmount) => {
  try {
    const user = await User.findOne({ email });

    const orderedProducts = products.map(({ id, name, quantity }) => {
      return {
        productId: id,
        productName: name,
        quantity,
      };
    });
    const order = await new Order({
      email,
      amount: totalAmount,
      address: user.address,
      products: orderedProducts,
    });

    await order.save();
    return order;
  } catch (e) {
    throw e;
  }
};

const getAllOrderForUser = async (email) => {
  try {
    const orders = await Order.find({ email });
    return orders;
  } catch (e) {
    throw e;
  }
};
module.exports = { createOrder, getAllOrderForUser };
