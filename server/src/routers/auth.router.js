const { Router } = require('express');

const authRouter = new Router();

const {
  login,
  logout,
  register,
  session,
  forgotPass,
  resetPass,
} = require('../controllers/authController');

module.exports = authRouter
  .post('/login', login)
  .get('/logout', logout)
  .post('/register', register)
  .post('/forgot-pass', forgotPass)
  .post('/reset-pass', resetPass)
  .get('/session', session);
