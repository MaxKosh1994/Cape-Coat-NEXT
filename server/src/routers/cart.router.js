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
  addMeasures,
} = require('../controllers/cartController');

const cartRouter = new Router();

module.exports = cartRouter
  .get('/promocode/:code', checkPromoCode)
  .get('/cartInCat', getCartInCat)
  .get('/:user', getCart)
  .post('/measures/:id', addMeasures)
  .post('/item/add', addToCartInOneCat)
  .post('/item/:id', addToCart)
  .get('/item/:email', checkCart)
  .delete('/item/del', delToCartInOneCat)
  .delete('/item/:id/:user', delItemFromCart)
  .delete('/emptyCart/:user', emptyCart);
