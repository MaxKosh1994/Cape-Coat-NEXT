const { Router } = require('express');

const catalogRouter = new Router();

const {
  getAll,
  getCollection,
  getNewArrivals,
  getAllCollections,
} = require('../controllers/catalogController');

module.exports = catalogRouter
  .get('/categories', getAll)
  .get('/collection', getCollection)
  .get('/collection/all', getAllCollections)
  .get('/new-arrivals', getNewArrivals);
