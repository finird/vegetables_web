const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: [true, 'Tag name is required!']
  },
  id: {
    type: Number,
    required: [true, 'id is required!'],
    unique: true
  },
  slug: {
    type: String
  }
});

tagSchema.pre('save', function(next) {
  const tag = this;
  try {
    tag.slug = tag.tagName
      .trim()
      .replace(/\ /g, '-')
      .toLowerCase();
    next();
  } catch (err) {
    if (err) return next();
  }
});

const Tag = mongoose.model('Tag', tagSchema, 'tag');
exports.tagSchema = tagSchema;
exports.Tag = Tag;
