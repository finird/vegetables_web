const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  currentUser,
  editUser,
  updatePhoto,
  deleteUser
} = require('../controllers/authControllers');
const authRoles = require('../middlewares/authRoles.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userRoles = require('../constant/userRoles');
const upload = require('../middlewares/upload.middleware');
const isRole = require('../middlewares/isRole.middleware');

router.route('/register').post(isRole, registerUser);
router.route('/current-user').get(authMiddleware, currentUser);
router.route('/getAll').get(getAllUsers);
router.route('/login').post(loginUser);
router.route('/edit/:id').post(authMiddleware, editUser);
router.route('/:id').get(getUserById);
router.route('/edit/:id').get(authMiddleware, editUser);
router.route('/delete/:id').delete(deleteUser);
router
  .route('/upload/photo')
  .post(authMiddleware, upload.single('image'), updatePhoto);

module.exports = router;
