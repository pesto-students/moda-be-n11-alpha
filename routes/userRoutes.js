const router = require("express").Router();
const User = require("../models/User");
const {
  createUser,
  findUser,
  loginUser,
  authenticateToken,
} = require("../dao/UserDao");
const { body, validationResult } = require("express-validator");

const { sendEmail } = require("../utilities/email");

router.post("/login", async (req, res) => {
  console.log("login hit");
  try {
    const { email, password } = req.body;
    let oldToken = req.cookies.jwt;
    if (!oldToken) {
      oldToken = req.headers.authorization;
    }
    if (oldToken || oldToken === "null") {
      const { email = "" } = await authenticateToken(oldToken);
      if (email !== "") {
        const saved_user = await User.findOne({ email });
        return res.send(saved_user);
      }
    } else if (!(email && password))
      return res.status(400).send("All input is required");
    const { token, saved_user } = await loginUser(email, password);
    if (saved_user) {
      return res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .send(saved_user);
    } else return res.status(400).send("Invalid Credentials");
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});
router.post("/", body("username").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let { username, email, password, address, phoneNumber } = req.body;
      const oldUser = await findUser(email);
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const { token, user } = await createUser(
        username,
        email,
        password,
        address,
        phoneNumber
      );

      const saved_user = await user.save();

      return res
        .cookie("jwt", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send(saved_user);
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});
router.get("/logout", async (req, res) => {
  res.clearCookie("jwt").send("logged out successfully");
});

module.exports = router;
