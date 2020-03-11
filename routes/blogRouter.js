const router = require('express').Router();
const commentRouter = require('./commentRouter');
const tagRouter = require('./tagRouter');
const UserRoles = require('../constant/userRoles');

const auth = require('../middlewares/auth.middleware');
const authRoles = require('../middlewares/authRoles.middleware');
const blogOwner = require('../middlewares/blog.owner.middlewares');
const {
  getAllBlogs,
  getBlogById,
  postNewBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogControllers');

// `Comment` router merge
// router.use('/posts/:postName/comments', commentRouter);

// `Tag` router merge
router.use('/tag', tagRouter);

router
  .route('/')
  .get(getAllBlogs)
  .post(postNewBlog);

router
  .route('/:blog')
  .get(getBlogById)
  .patch(auth, authRoles([UserRoles.Edit]), blogOwner(false), updateBlog)
  .delete(
    auth,
    authRoles([UserRoles.Edit, UserRoles.Admin]),
    blogOwner(true),
    deleteBlog
  );

module.exports = router;
