const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('http-status-codes');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  if(!req.header('Authorization')){
    res
      .status(BAD_REQUEST)
      .json({ error: 'Not authorized to access this resource' });
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const auth = await User.findOne({ _id: data.id }).select(
      'id last_name first_name roles createdAt address email username'
    );
    if (!auth) {
      res
        .status(BAD_REQUEST)
        .json({ error: 'Not authorized to access this resource' });
    }
    req.auth = auth;
    req.token = token;
    next();
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ error: 'Not authorized to access this resource' });
  }
};
module.exports = authMiddleware;
