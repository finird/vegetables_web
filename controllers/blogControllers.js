// const Comment = require('../models/Comment');
const Helper = require('../helper/handle');
const Blog = require('../models/Blog');
const APIFeatures = require('../utils/APIfeatures');

exports.getBlogById = async function(req, res, next) {
  try {
    const result = await Blog.findById(req.params.blog);
    return Helper.handleSuccess(res, result);
  } catch (err) {
    return Helper.handleError(res, err);
  }
};

exports.postNewBlog = async function(req, res, next) {
  try {
    const result = await Blog.create(req.body);
    return Helper.handleSuccess(res, result);
  } catch (err) {
    return Helper.handleError(res, {
      requestAt: new Date().toISOString(),
      error: {
        message: err.message,
        name: err.name
      }
    });
  }
};

exports.updateBlog = async function(req, res, next) {
  try {
    const result = await Blog.findByIdAndUpdate(req.body.blog, req.body);
    return Helper.handleSuccess(res, result);
  } catch (err) {
    return Helper.handleError(res, err);
  }
};

exports.deleteBlog = async function(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.body.blog);
    return Helper.handleSuccess(res, {
      requestAt: new Date().toISOString(),
      message: 'success'
    });
  } catch (err) {
    return Helper.handleError(res, err);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  let filter = {};
  if (req.params.blog) filter = { blog: req.params.blog };
  const features = new APIFeatures(Blog.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  try {
    const doc = await features.query;
    return Helper.handleSuccess(res, {
      status: 'success',
      result: doc.length,
      data: {
        data: doc
      }
    });
  } catch (er) {
    return Helper.handleError(res, {
      status: 'fail',
      requestAt: new Date().toISOString(),
      message: er.message
    });
  }
};
