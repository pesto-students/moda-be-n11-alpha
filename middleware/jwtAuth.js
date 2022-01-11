const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('../utilities/error');
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.jwtAuth = true;
    req.email = decoded.email;
    next();
  } catch (e) {
    next(new ForbiddenError(e.message));
  }
};
module.exports = { protectedRoute };
