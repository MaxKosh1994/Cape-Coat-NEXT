const { Router } = require('express');

const catalogRouter = new Router();

const {
  getAll,
  getCollection,
  getNewArrivals,
} = require('../controllers/catalogController');

module.exports = catalogRouter
  .get('/categories', getAll)
  .get('/collection/:id', getCollection)
  .get('/new-arrivals', getNewArrivals);
