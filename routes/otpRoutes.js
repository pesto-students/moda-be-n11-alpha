const router = require("express").Router();
const User = require("../models/User");
const Otp = require("../models/Otp");
const { sendEmail } = require("../utilities/email");
const bcrypt = require("bcrypt");

router.post("/generateOtp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const oldOtp = await Otp.findOne({ email });
    let otp = Math.floor(Math.random() * 10000 + 1);
    if (oldOtp) {
      oldOtp.otp = otp;
      await oldOtp.save();
    } else {
      let newOtp = new Otp({
        email,
        otp,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      await newOtp.save();
    }
    await sendEmail(
      email,
      "Reset Password OTP",
      `Your reset OTP is ${otp} which will expires in 5 mins`
    );
    res.send("mail send");
  } else {
    res.status(401).send("User is not registered");
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp, password } = req.body;
  if (email) {
    const oldOtp = await Otp.findOne({ email });
    if (oldOtp.otp === otp) {
      const user = await User.findOne({ email });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();
      return res.send("Password changed successfully");
    } else {
      return res.status(401).send("wrong otp providesd");
    }
  }
  return res.status(401).send("wrong otp providesd");
});

module.exports = router;
