const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const { tagSchema } = require('./Tag');

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  closed: {
    type: Boolean,
    default: false,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  description: {
    type: String,
    max: 400,
    trim: true,
    required: true
  },
  summary: {
    type: String,
    trim: true,
    required: true
  },
  imageCover: {
    type: String,
    default: null
  },
  // TODO: tags solution
  tags: {
    type: [Number],
    default: 0
    // _id: false
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  images: { type: [String], default: null },
  category: {
    type: Schema.Types.ObjectId
  }
});

blogSchema.methods = {
  isAuthor: function(userId) {
    return this.author.equals(userId);
  }
};

const Blog = mongoose.model('Blog', blogSchema, 'blog');
module.exports = Blog;
