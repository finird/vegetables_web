const Blog = require('../models/Blog');
const Helper = require('../helper/handle');
const UserRoles = require('../constant/userRoles');

// BUG: test this
/**
 * `adminPermission`: Allow _admin_ to access blog
 * @param: adminPermission
 */
module.exports = function(adminPermission = false) {
  if (adminPermission) {
    return function(req, res, next) {
      if (req.auth.roles === UserRoles.Admin) next();
      return Helper.handleError(res, {
        status: 'fail',
        requestTime: new Date().toISOString(),
        message: 'Admin acccess denied!'
      });
    };
  }
  return async function(req, res, next) {
    const user = req.auth;
    const blogID = req.params.blog ? req.body.blog : null;

    if (!blogID) {
      return Helper.handleError(res, {
        requestAt: new Date().toISOString(),
        status: 'fail',
        message: 'No blog ID included!'
      });
    }

    const blog = await Blog.findById(blogID, 'author');

    if (user._id === blog.author) next();
    else
      return Helper.handleError(res, {
        requestAt: new Date().toISOString(),
        status: 'fail',
        message: 'Permission denied!'
      });
  };
};
