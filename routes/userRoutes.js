const router = require("express").Router();
const { createUser, findUser } = require("../dao/UserDao");
const { body, validationResult } = require("express-validator");

const { sendEmail } = require("../utilities/email");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await findUser(email);
    console.log(req.body, username, email, password);
    return res.send();
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});
router.post("/", body("username").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let { username, email, password } = req.body;
      console.log(username, email, password);
      const oldUser = await findUser(email);
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const user = await createUser(username, email, password);
      console.log("***user is found***", user);
      const saved_user = await user.save();
      return res.send(saved_user);
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
