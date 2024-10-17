const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyEmail,
  resetPassword,
} = require('../services/authService');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyEmail', verifyEmail);
router.put('/resetPassword', resetPassword);

module.exports = router;
