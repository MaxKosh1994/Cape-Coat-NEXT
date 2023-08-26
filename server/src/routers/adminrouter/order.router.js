const { Router } = require('express');
const {
  readOrder,
  updateOrderField,
  updateOrderItemField,
} = require('../../controllers/adminControllers/orderController');

const orderRouter = new Router();

module.exports = orderRouter
  .get('/allorder', readOrder)
  .patch('/updateOrderField/:id', updateOrderField)
  .patch('/updateOrderItemField/:id/:itemId', updateOrderItemField);
