const router = require('express').Router();

const {
  getAll,
  createProduct,
  uploadImage,
  deleteImage,
  getById
} = require('../controllers/productControllers');
const upload = require('../middlewares/upload.middleware');

router
  .route('/')
  .get(getAll)
  .post(createProduct);

router.route('/:id/upload').post(upload.single('image'), uploadImage);
router.route('/:id/delete/:filename').delete(deleteImage);
router.route('/:id').get(getById);

module.exports = router;
