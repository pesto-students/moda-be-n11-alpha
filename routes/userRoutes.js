const router = require('express').Router();
const User = require('../models/User');
const {
  createUser,
  findUser,
  loginUser,
  authenticateToken,
} = require('../dao/UserDao');
const { body, validationResult } = require('express-validator');
const { GeneralError } = require('../utilities/error');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let oldToken = req.cookies.jwt;
    if (!oldToken) {
      oldToken = req.headers.authorization;
    }
    if (oldToken || oldToken === 'null') {
      const { email = '' } = await authenticateToken(oldToken);
      if (email !== '') {
        const saved_user = await User.findOne({ email });
        return res.send(saved_user);
      }
    } else if (!(email && password))
      return res.status(400).send('All input is required');
    const { token, saved_user } = await loginUser(email, password);
    if (saved_user) {
      return res
        .cookie('jwt', token, {
          httpOnly: true,
        })
        .send(saved_user);
    } else return res.status(400).send('Invalid Credentials');
  } catch (e) {
    next(new GeneralError(e.message));
  }
});
router.post('/', body('username').isEmail(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let { username, email, password, address, phoneNumber } = req.body;
      const oldUser = await findUser(email);
      if (oldUser) {
        return res.status(409).send('User Already Exist. Please Login');
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
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send(saved_user);
    }
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

router.get('/logout', async (_, res, next) => {
  try {
    res.clearCookie('jwt').send('logged out successfully');
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

module.exports = router;
