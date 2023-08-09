const { Router } = require('express');
const { getStock } = require('../controllers/stockController');

const cartRouter = new Router();

module.exports = cartRouter.get('/', getStock);
