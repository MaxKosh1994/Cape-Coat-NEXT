const { Router } = require('express');

const itemRouter = new Router();

const {
  favourites,
  oneItem,
  addFavourites,
  getAllItems,
  getAllItemsWithFavorites,
} = require('../controllers/itemController');

module.exports = itemRouter.get('/allItems', getAllItems);
module.exports = itemRouter.get('/allFavorites', getAllItemsWithFavorites);
module.exports = itemRouter.get('/favourites/:id', favourites);
module.exports = itemRouter.post('/favourites/:id', addFavourites);

module.exports = itemRouter.get('/:id', oneItem);
