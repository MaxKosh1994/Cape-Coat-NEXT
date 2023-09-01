const { Router } = require('express');

const itemRouter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/items');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage: storage });

const {
  createItem,
  readItem,
  updateItem,
  deleteItem,
} = require('../../controllers/adminControllers/itemController');

module.exports = itemRouter
  .post('/create-item', upload.array('photos', 12), createItem)
  .get('/read-item', readItem)
  .patch('/update-item/:id', upload.array('photos', 12), updateItem)
  .delete('/delete-item/:id', deleteItem);
