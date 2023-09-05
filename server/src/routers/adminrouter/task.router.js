const { Router } = require('express');
const { createTask } = require('../../controllers/adminControllers/taskController');

const taskRouter = new Router();

module.exports = taskRouter
  .post('/', createTask)