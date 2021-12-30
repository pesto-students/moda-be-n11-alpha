const router = require("express").Router();
const { getAllOrderForUser } = require("../dao/orderDao");
const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const orders = await getAllOrderForUser(decoded.email);
    return res.send(orders);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
