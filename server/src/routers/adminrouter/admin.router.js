const router = require('express').Router();

const itemRoter = require('./item.router');
const collectionRoter = require('./collection.router');
const categoryRoter = require('./category.router');
const materialRouter = require('./material.router');
const orderRouter = require('./order.router');
const usersRouter = require('./users.router');

module.exports = router
  .use('/item', itemRoter)
  .use('/category', categoryRoter)
  .use('/collection', collectionRoter)
  .use('/material', materialRouter)
  .use('/order', orderRouter)
  .use('/users', usersRouter);
