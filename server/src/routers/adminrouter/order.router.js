const { Router } = require('express');
const {
  readOrder,
  updateOrder,
  updateOrderComments,
} = require('../../controllers/adminControllers/orderController');

const orderRouter = new Router();

module.exports = orderRouter
  .get('/allorder', readOrder)
  .patch('/update/:id', updateOrder)
  .patch('/updateOrderComments/:id', updateOrderComments);
