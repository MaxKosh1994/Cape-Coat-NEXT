const { Router } = require('express');
const { createOrder } = require('../controllers/orderController');

const orderRouter = new Router();

module.exports = orderRouter.post('/new', createOrder);
