const router = require("express").Router();
const {
  createUser,
  findUser,
  loginUser,
  authenticateToken,
} = require("../dao/UserDao");
const { body, validationResult } = require("express-validator");

const { sendEmail } = require("../utilities/email");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldToken = req.cookies.jwt;
     if (oldToken) {
      const result = await authenticateToken(oldToken);
       if (result) {
        const saved_user = await User.findOne({ email });
        res.send(saved_user);
      } else {
      }
    } else if (!(email && password))
      return res.status(400).send("All input is required");
    const { token, saved_user } = await loginUser(email, password);
    if (saved_user) {
      res
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 3600),
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
      res.cookie("jwt", token);
      return res.send(saved_user);
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
