const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isRole = async (req, res, next) => {
  if (!req.header('Authorization')) {
    res.isRole = null;
    next();
    return;
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await User.findOne({ _id: data.id });
      if (!user) {
        res.isRole = null;
        next();
        return;
      }
      req.isRole = user.roles;
      next();
    } catch (error) {
      res.isRole = null;
      next();
      return;
    }
  } catch (err) {
    res.isRole = null;
    next();
  }
};
module.exports = isRole;
