const router = require("express").Router();
const { saveEmailAndSendMail } = require("../dao/NewsletterDao");

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    await saveEmailAndSendMail(email);
    return res.send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
