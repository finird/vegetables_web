const expressJwt = require('express-jwt');

const { handleError } = require('../helper/handle');

function authRole(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  const secret = process.env.JWT_SECRET;
  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret }),
    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.auth.roles)) {
        return handleError(res, {
          message: 'Unauthorized'
        });
      }
      next();
    }
  ];
}
module.exports = authRole;
