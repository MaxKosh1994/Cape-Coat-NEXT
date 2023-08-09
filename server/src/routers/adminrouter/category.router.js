const { Router } = require('express');
const categoryRoter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const replaceName = require('../../lib/replaceName');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/category');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}${replaceName(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });
const {
  readCategory,
  addCategory,
} = require('../../controllers/adminControllers/categoryController');

module.exports = categoryRoter
  .get('/allcategory', readCategory)
  .post('/addcategory', upload.array('photos', 1), addCategory);
