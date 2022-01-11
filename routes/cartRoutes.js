const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { findCart, createCartForNewUser } = require('../dao/cartDao');
const { GeneralError, ForbiddenError } = require('../utilities/error');

router.get('/', async (req, res, next) => {
  try {
    if (req.jwtAuth) {
      const cart = await findCart(req.email);
      if (cart?.products?.length > 0) return res.send(cart.products);
      else return res.send([]);
    } else {
      next(new ForbiddenError(e.message));
    }
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

router.post('/', async (req, res, next) => {
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
    next(new GeneralError(e.message));
  }
});

router.delete('/', async (req, res, next) => {
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
    next(new GeneralError(e.message));
  }
});

router.patch('/', async (req, res, next) => {
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
    next(new GeneralError(e.message));
  }
});

module.exports = router;
