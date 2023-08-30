const { Router } = require('express');
const categoryRoter = new Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, 'storage/materials');
  },
  filename(req, file, cb) {
    return cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage: storage });
const {
  readMaterial,
  addMaterial,
  delMaterial,
  editMaterial,
  getAllMaterials,
} = require('../../controllers/adminControllers/materialController');

module.exports = categoryRoter
  .get('/allmaterial', readMaterial)
  .post('/addmaterial', upload.array('photos', 1), addMaterial)
  .delete('/delmaterial/:id', delMaterial)
  .patch('/editmaterial', upload.array('photos', 1), editMaterial)
  .get('/getallmaterials', getAllMaterials);
