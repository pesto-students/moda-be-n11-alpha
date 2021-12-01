const User = require("../models/User");
const jwt = require("jsonwebtoken");

function generateAccessToken(username, password) {
  return jwt.sign({ username, password }, process.env.TOKEN_SECRET, {
    expiresIn: "360000s",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

const findUser = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = generateAccessToken(username, password);
      return token;
    }
  } catch (ex) {
    throw ex;
  }
};
module.exports = { findUser, authenticateToken };
