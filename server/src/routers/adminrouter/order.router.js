const { Router } = require('express');
const {
  readOrder,
  updateOrderField,
} = require('../../controllers/adminControllers/orderController');

const orderRouter = new Router();

module.exports = orderRouter
  .get('/allorder', readOrder)
  .patch('/updateOrderField/:id', updateOrderField);
