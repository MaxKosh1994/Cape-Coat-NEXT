const { Router } = require('express');

const categoryRouter = new Router();
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
  createMaterial,
  readMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterials,
} = require('../../controllers/adminControllers/materialController');

module.exports = categoryRouter
  .post('/create-material', upload.array('photos', 1), createMaterial)
  .get('/read-material', readMaterial)
  .patch('/update-material', upload.array('photos', 1), updateMaterial)
  .delete('/delete-material/:id', deleteMaterial)
  .get('/getallmaterials/:id', getAllMaterials);
