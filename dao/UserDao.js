const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

const findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (ex) {
    throw ex;
  }
};
const createUser = async (username, email, password) => {
  encryptedPassword = await bcrypt.hash(password, 10);
  const user = await new User({
    username,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    token: jwt.sign({ username, email }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    }),
  });
  console.log(user);
  return user;
};
module.exports = { findUser, authenticateToken, createUser };
