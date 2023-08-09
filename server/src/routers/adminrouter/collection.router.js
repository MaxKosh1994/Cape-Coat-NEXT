const { Router } = require('express');
const collectionRoter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const replaceName = require('../../lib/replaceName');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/collection');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}${replaceName(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });
const {
  readCollection,
  addCollection,
} = require('../../controllers/adminControllers/collectionController');

module.exports = collectionRoter
  .get('/allcollection', readCollection)
  .post('/addcollection', upload.array('photos', 1), addCollection);
