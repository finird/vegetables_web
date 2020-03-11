const router = require('express').Router();

const {
  getAll,
  createProduct,
  uploadImage,
  deleteImage
} = require('../controllers/productControllers');
const upload = require('../middlewares/upload.middleware');

router.route('/get-all').get(getAll);
router.route('/create').post(createProduct);
router.route('/upload/photo/:id').post(upload.single('image'), uploadImage);
router.route('/delete/photo/:id/:filename').delete(deleteImage);

module.exports = router;
