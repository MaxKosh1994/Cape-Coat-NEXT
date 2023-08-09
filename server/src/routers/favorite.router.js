const { Router } = require('express');

const favoriteRouter = new Router();

const {
  addFavorite,
  findAllFavCard,
  delFavorite
} = require('../controllers/favoriteController');

module.exports = favoriteRouter
  .get('/', findAllFavCard)
  .post('/add', addFavorite)
  .delete('/del', delFavorite);
