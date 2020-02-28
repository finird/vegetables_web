const { Schema } = require('mongoose');

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
    required: [true, "Comment's content is required!"]
    // value: {
    //   validator: function(v) {
    //     return v.length > 500;
    //   },
    //   message: props => `Content out of sizes!`
    // }
  }
});

commentSchema.add({
  replies: [{ type: commentSchema, _id: false, default: null }]
});

module.exports = commentSchema;
