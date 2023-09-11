const { Router } = require('express');

const itemRouter = new Router();

const {
  favourites,
  oneItem,
  addFavourites,
  getAllItems,
  getAllItemsWithFavorites,
  findItemsById,
} = require('../controllers/itemController');

module.exports = itemRouter
  .get('/allItems', getAllItems)
  .get('/allFavorites', getAllItemsWithFavorites)
  .get('/favourites/:email', favourites)
  .post('/favourites/:id', addFavourites)
  .post('/itemsById', findItemsById)
  .get('/:id', oneItem);
