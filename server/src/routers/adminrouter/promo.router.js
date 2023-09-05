const { Router } = require('express');
const {
  readAllPromo,
  createPromo,
  updatePromo,
  deletePromo,
} = require('../../controllers/adminControllers/promoController');

const promoRouter = new Router();

module.exports = promoRouter
  .get('/getAll', readAllPromo)
  .post('/createPromo', createPromo)
  .put('/updatePromo/:id', updatePromo)
  .delete('/deletePromo/:id', deletePromo);
