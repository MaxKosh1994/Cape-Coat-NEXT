const { Router } = require('express');

const categoryRouter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/category');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage: storage });

const {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require('../../controllers/adminControllers/categoryController');

module.exports = categoryRouter
  .post('/create-category', upload.array('photos', 1), createCategory)
  .get('/read-category', readCategory)
  .patch('/update-category/:id', upload.array('photos', 1), updateCategory)
  .delete('/delete-category/:id', deleteCategory);
