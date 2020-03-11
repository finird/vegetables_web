const { Tag } = require('../models/Tag');
const Helper = require('../helper/handle');

exports.postTag = async function(req, res, next) {
  req.body.id = await Tag.countDocuments();
  console.log(req.body);
  const newTag = new Tag(req.body);
  newTag.save(function(err, tag) {
    if (err)
      return Helper.handleError(res, {
        requestAt: new Date().toISOString(),
        message: err.message
      });
    return Helper.handleSuccess(res, tag);
  });
};

// BUG: auth test cases
exports.deleteTag = async function(req, res, next) {
  await Tag.findOneAndDelete({ id: req.params.tag });
  return Helper.handleSuccess(res, {
    requestAt: new Date().toISOString(),
    message: 'success'
  });
};

exports.getTag = async function(req, res, next) {
  const parsed = parseInt(req.params.tag, 10);
  const result = await Tag.findOne({
    $or: [{ id: Number.isNaN(parsed) ? -1 : parsed }, { slug: req.params.tag }]
  });
  return Helper.handleSuccess(res, result);
};

exports.getAllTags = async function(req, res, next) {
  const result = await Tag.find();
  Helper.handleSuccess(res, result);
};
