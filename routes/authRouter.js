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
router.route('/current-user').get(isRole, authMiddleware, currentUser);
router.route('/get-all').get(getAllUsers);
router.route('/login').post(loginUser);
router.route('/edit/:id').post(isRole, authMiddleware, editUser);
router.route('/:id').get(getUserById);
router.route('/delete/:id').delete(isRole, authMiddleware, deleteUser);
router
  .route('/upload/photo/:id')
  .post(authMiddleware, isRole, upload.single('image'), updatePhoto);

module.exports = router;
