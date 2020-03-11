const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User's ID is required!"]
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: [true, "Post's ID is required!"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  /** `Frontend` size validation. */
  content: {
    type: String,
    required: [true, "Comment's content is required!"],
    max: 1000,
    trim: true
  },
  isParent: {
    type: Boolean,
    default: true
  }
});

commentSchema.add({
  replies: [
    {
      type: commentSchema,
      default: null,
      _id: false
    }
  ]
});

const Comment = mongoose.model('Comment', commentSchema, 'comment');
module.exports = Comment;
