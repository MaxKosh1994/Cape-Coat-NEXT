const { Router } = require('express');

const authRouter = new Router();

const {
  login,
  logout,
  register,
  session,
} = require('../controllers/authController');

module.exports = authRouter
  .post('/login', login)
  .get('/logout', logout)
  .post('/register', register)
  .get('/session', session);
