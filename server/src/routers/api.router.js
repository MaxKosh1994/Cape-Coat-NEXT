const router = require('express').Router();

const authRouter = require('./auth.router');
const adminRouter = require('./adminrouter/admin.router');
const accountRouter = require('./account.router');
const catalogRouter = require('./catalog.router');
const stockRouter = require('./stock.router');
const cartRouter = require('./cart.router');
const { isAuth } = require('../middleware/isAuth');
const itemRouter = require('./item.router');
const orderRouter = require('./order.router');
const categoryRouter = require('./category.router');
const favoriteRouter = require('./favorite.router')

module.exports = router
  .use('/auth', authRouter)
  .use('/admin', adminRouter)
  .use('/account', isAuth, accountRouter)
  .use('/catalog', catalogRouter)
  .use('/stock', stockRouter)
  .use('/cart', cartRouter)
  .use('/order', orderRouter)
  .use('/item', itemRouter)
  .use('/category', categoryRouter)
  .use('/favorite', favoriteRouter);
