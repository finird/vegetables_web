const router = require('express').Router();

// GET Comment(s) by Post
// POST Comment(s) to Post
// UPDATE Comment(s) to Post
// DELETE Comment(s) from Post
/* TODO:
    UPDATE by post is just fix very first info on Comments, not on Replies
    POST: create new Comments, no reply.
*/
// router
//   .use('/')
//   .get()
//   .post()
//   .patch()
//   .delete();

// GET Comment(s) by Comment
// POST Reply (Replies) to Comment
// UPDATE Reply (Replies) to Comment
// DELETE Comment(s) from Post
// TODO: delete comment from post equivant delete all this replies
// router
//   .use('/:commentId')
//   .get()
//   .post()
//   .patch()
//   .delete();

// DELETE Reply (Replies) from Comment
/* TODO:
 * actually update this document, document.replies[];
 * delete comment from post equivant delete all this replies
 */
// router.use('/:commentId/commentMatched').delete();

module.exports = router;
