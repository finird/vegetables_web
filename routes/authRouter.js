const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  currentUser,
  editUser
} = require('../controllers/authControllers');

const authMiddleware = require('../middlewares/auth.middleware');
const authRolesMiddleware = require('../middlewares/authRoles.middleware');
const userRoles = require('../constant/userRoles');

router.route('/current-user').get(authMiddleware, currentUser);
router.route('/getAll').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/:id').get(getUserById);
// router.route('/edit/:id').get(authMiddleware, editUser);

module.exports = router;
