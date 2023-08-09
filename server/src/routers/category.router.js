const { Router } = require('express');

const categoryRouter = new Router();

const { oneCategory } = require('../controllers/categoryController');

module.exports = categoryRouter.get('/:id', oneCategory);
