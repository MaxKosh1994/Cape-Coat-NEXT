const { Router } = require('express');
const {
  getALLUsers,
} = require('../../controllers/adminControllers/usersController');

const usersRouter = new Router();

module.exports = usersRouter.get('/all', getALLUsers);
