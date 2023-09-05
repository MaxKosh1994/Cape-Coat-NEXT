const { Router } = require('express');

const collectionRoter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/collection');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage: storage });

const {
  createCollection,
  readCollection,
  updateCollection,
  deleteCollection,
} = require('../../controllers/adminControllers/collectionController');

module.exports = collectionRoter
  .post('/create-collection', upload.array('photos', 1), createCollection)
  .get('/read-collection', readCollection)
  .patch('/update-collection/:id', upload.array('photos', 1), updateCollection)
  .delete('/delete-collection/:id', deleteCollection);
