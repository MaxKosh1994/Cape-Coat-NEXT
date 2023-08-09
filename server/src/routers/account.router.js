const { Router } = require('express');

const accountRouter = new Router();

const {
  getProfileInfo,
  getMeasurementInfo,
  getAllOrders,
  updateInfo,
  updateMeasurement,
} = require('../controllers/accountController');

module.exports = accountRouter
  .get('/profile/info', getProfileInfo)
  .get('/profile/measurement', getMeasurementInfo)
  .get('/profile/orders', getAllOrders)
  .patch('/profile/editInfo', updateInfo)
  .patch('/profile/editMeasurements', updateMeasurement);
