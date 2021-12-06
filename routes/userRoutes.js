const router = require("express").Router();
const User = require("../models/User");
router.get("/", (req, res) => {
  return res.send("userfound");
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password,  } = req.body;
    const newuser = new User({ username, email, password});
    await newuser.save();
    return res.send();
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
