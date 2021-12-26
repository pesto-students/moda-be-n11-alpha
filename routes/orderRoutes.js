const router = require("express").Router();
const { getAllOrderForUser } = require("../dao/orderDao");

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await getAllOrderForUser(email);
    return res.send(orders);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
