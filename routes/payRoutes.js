const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
const { createOrder } = require("../dao/orderDao");

router.post("/", async (req, res) => {
  try {
    const { email, cart, amount } = req.body;
    await createOrder(email, cart, amount);
    return res.send("success");
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
