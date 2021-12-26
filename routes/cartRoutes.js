const router = require("express").Router();
const { findCart, createCartForNewUser } = require("../dao/cartDao");

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const cart = await findCart(userId);
  if (cart?.products?.length > 0) return res.send(cart.products);
  else return res.send([]);
});

router.post("/", async (req, res) => {
  try {
    const { email, product } = req.body;
    let cart = await findCart(email);
    if (!cart || cart.length === 0) {
      await createCartForNewUser(email, product);
    } else {
      cart.products.push(product);
      await cart.save();
    }
    return res.send([]);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { email, id, size, color, qty } = req.query;
    let cart = await findCart(email);
    let products = cart.products.filter((product) => {
      if (
        product.id === id &&
        product.color === color &&
        product.size === size
      ) {
        return false;
      } else {
        return true;
      }
    });
    cart.products = products;
    await cart.save();
    return res.send(`Product with ${id} is deleted with quantity ${qty}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/", async (req, res) => {
  try {
    const { email, id, size, color, qty } = req.body;
    let cart = await findCart(email);
    for (let product of cart.products) {
      if (
        product.id === id &&
        product.color === color &&
        product.size === size
      ) {
        product.quantity = product.quantity + qty;
        await cart.save();
      }
    }
    return res.send(`Product with ${id} is updated with quantity ${qty}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/deleteAllProducts", async (req, res) => {
  try {
    let cart = await findCart(email);
    cart.products = [];
    await cart.save();
    return res.send(`Products has been deleted from the cart`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
