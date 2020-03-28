const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('http-status-codes');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  if (!req.header('Authorization')) {
    res
      .status(BAD_REQUEST)
      .json({ message: 'Not authorized to access this resource' });
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: data.id });
    if (!user) {
      res
        .status(BAD_REQUEST)
        .json({ message: 'Not authorized to access this resource' });
    }
    req.auth = user;
    req.token = token;
    next();
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ message: 'Not authorized to access this resource' });
  }
};
module.exports = authMiddleware;
