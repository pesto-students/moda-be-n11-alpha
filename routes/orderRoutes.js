const router = require('express').Router();
const { getAllOrderForUser } = require('../dao/orderDao');
const { GeneralError, ForbiddenError } = require('../utilities/error');

router.get('/', async (req, res, next) => {
  try {
    if (req.jwtAuth) {
      const orders = await getAllOrderForUser(req.email);
      return res.send(orders);
    } else {
      next(new ForbiddenError('jwt token not found'));
    }
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

module.exports = router;
