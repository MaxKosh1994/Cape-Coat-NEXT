const { Router } = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const replaceName = require('../../lib/replaceName');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/items');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}${replaceName(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const itemRoter = new Router();

const {
  addItem,
  delItem,
  readItem,
} = require('../../controllers/adminControllers/itemController');

module.exports = itemRoter
  .post('/additem', upload.array('photos', 12), addItem)
  .post('/delitem', delItem)
  .get('/allitem', readItem);
