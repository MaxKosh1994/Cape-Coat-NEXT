const { Router } = require('express');

const accountRouter = new Router();

const {
  getProfileInfo,
  getAllOrders,
  updateInfo,
} = require('../controllers/accountController');

module.exports = accountRouter
  .get('/profile/info', getProfileInfo)
  .get('/profile/orders', getAllOrders)
  .patch('/profile/editInfo', updateInfo);
