const router = require('express').Router();
const {getAllUsers,
  getUserById,
  registerUser,
  loginUser} = require('../controllers/authControllers');

router.route('/getAll').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);


module.exports = router;