const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('http-status-codes');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: data.id }).select(
      'id last_name first_name roles createdAt address email username'
    );
    if (!user) {
      res
        .status(BAD_REQUEST)
        .json({ error: 'Not authorized to access this resource' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ error: 'Not authorized to access this resource' });
  }
};
module.exports = authMiddleware;
