const router = require('express').Router();

const {
  getAllPosts,
  getPostById,
  search,
  getPostsByUser,
  getPostByUser,
  getPostsByCategory
} = require('../controllers/blogControllers');

// GET all Posts
router.route('/').get(getAllPosts);
router.route('/posts').get(getAllPosts);

// GET Post
router.route('/posts/:postName').get(getPostById);

// GET Posts by Category
router.route('/category/:id').get(getPostsByCategory);

// GET (Search) Posts by Category and User
router.route('/search').get(search);

// GET Posts by User
// TODO: fix `post-name` route to slug
router.route('/user/:userId/').get(getPostsByUser);

// Get Post by User and Post name
// TODO: fix `post-name` route to slug
router.route('/user/:userId/:postName').get(getPostByUser);

module.exports = router;
