const router = require('express').Router();

const itemRoter = require('./item.router');
const collectionRoter = require('./collection.router');
const categoryRoter = require('./category.router');
const orderRouter = require('./order.router');
const usersRouter = require('./users.router');
const taskRouter = require('./task.router');

module.exports = router
  .use('/items', itemRoter)
  .use('/category', categoryRoter)
  .use('/collection', collectionRoter)
  .use('/order', orderRouter)
  .use('/users', usersRouter)
  .use('/tasks', taskRouter);
