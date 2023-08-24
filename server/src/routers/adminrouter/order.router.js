const { Router } = require('express');
const {
  readOrder,
  updateOrder,
  updateOrderComments,
  updateOrderPrepayment,
  updateOrderTotal,
} = require('../../controllers/adminControllers/orderController');

const orderRouter = new Router();

module.exports = orderRouter
  .get('/allorder', readOrder)
  .patch('/update/:id', updateOrder)
  .patch('/updateOrderComments/:id', updateOrderComments)
  .patch('/updateOrderPrepayment/:id', updateOrderPrepayment)
  .patch('/updateOrderTotal/:id', updateOrderTotal);
