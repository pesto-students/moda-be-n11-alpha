const router = require('express').Router();
const { saveEmailAndSendMail } = require('../dao/NewsletterDao');
const { GeneralError } = require('../utilities/error');

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query;
    await saveEmailAndSendMail(email);
    return res.send();
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

module.exports = router;
