const router = require('express').Router();

const authRoles = require('../middlewares/authRoles.middleware');
const auth = require('../middlewares/auth.middleware');
const userRoles = require('../constant/userRoles');

const {
  postTag,
  getAllTags,
  getTag,
  deleteTag
} = require('../controllers/tagControllers');

router
  .route('/')
  .get(getAllTags)
  .post(postTag);

router
  .route('/:tag')
  .get(getTag)
  .delete(
    auth,
    authRoles([userRoles.Edit, userRoles.Admin, userRoles.Receptionist]),
    deleteTag
  );

module.exports = router;
