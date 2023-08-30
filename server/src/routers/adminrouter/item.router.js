const { Router } = require('express');
const itemRoter = new Router();
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
  readItem,
  addItem,
  delItem,
  editItem
} = require('../../controllers/adminControllers/itemController');

module.exports = itemRoter
  .get('/allitem', readItem)
  .post('/additem', upload.array('photos', 12), addItem)
  .delete('/delitem/:id', delItem)
  .patch('/edititem', upload.array('photos', 1), editItem);
