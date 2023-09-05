const router = require('express').Router();

const itemRouter = require('./item.router');
const collectionRouter = require('./collection.router');
const categoryRouter = require('./category.router');
const materialRouter = require('./material.router');
const orderRouter = require('./order.router');
const taskRouter = require('./task.router');
const promoRouter = require('./promo.router');

module.exports = router
  .use('/item', itemRouter)
  .use('/category', categoryRouter)
  .use('/collection', collectionRouter)
  .use('/material', materialRouter)
  .use('/order', orderRouter)
  .use('/tasks', taskRouter)
  .use('/promo', promoRouter);
