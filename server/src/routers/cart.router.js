const { Router } = require('express');
const {
  getCart,
  delItemFromCart,
  checkPromoCode,
  emptyCart,
  addToCart,
  checkCart,
  addToCartInOneCat,
  delToCartInOneCat,
  getCartInCat,
} = require('../controllers/cartController');

const cartRouter = new Router();

module.exports = cartRouter
  .get('/promocode/:code', checkPromoCode)
  .get('/cartInCat', getCartInCat)
  .get('/:user', getCart)
  .post('/item/add', addToCartInOneCat)
  .post('/item/:id', addToCart)
  .get('/item/:id', checkCart)
  .delete('/item/del', delToCartInOneCat)
  .delete('/item/:id/:user', delItemFromCart)
  .delete('/emptyCart/:user', emptyCart);
