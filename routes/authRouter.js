const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  currentUser,
  editUser
} = require('../controllers/authControllers');
const authRoles = require('../middlewares/authRoles.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesEnum = require('../constant/roleEnum');

router.route('/register').post(registerUser);
router.route('/current-user').get(authMiddleware, authRoles([rolesEnum.Admin]), currentUser);
router.route('/getAll').get(getAllUsers);
router.route('/login').post(loginUser);
router.route('/edit/:id').post(authMiddleware, editUser);
router.route('/:id').get(getUserById);

module.exports = router;
