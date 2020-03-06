const { OK, BAD_REQUEST } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(OK).json({
    status: OK,
    data: {
      users
    }
  });
};
exports.getUserById = (req, res) => {
  const { id } = req.params;
  return res.status(OK).json({
    status: OK,
    data: {
      ok: 'Data user by id',
      id
    }
  });
};
exports.registerUser = async (req, res) => {
  if(req.body.username){
    const user = await User.findOne({username: req.body.username});
    
    if(!Object.keys(user).length){
      return res.status(BAD_REQUEST).json({
        error: "username exist"
      });
    }
  }
  if(req.body.email){
    const user = await User.findOne({email: req.body.email});
    if(!Object.keys(user).length) {
      return res.status(BAD_REQUEST).json({
        error: "email exist"
      });
    }
  }
  const user = new User(req.body);
  user.save(function(error) {
    if (!Object.keys(error).length) {
      return res.status(BAD_REQUEST).json({
        error
      });
    }
    return res.status(OK).json({
      user
    });
  });
};
exports.loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  let options = {};
  if (username) {
    options = {
      username
    };
  } else {
    options = {
      email
    };
  }
  User.findOne(options, async (err, user) => {
    // if err or no user
    if (err || !user) {
      return res.status(BAD_REQUEST).json({
        error: 'User with that email does not exist. Please signup.'
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(BAD_REQUEST).json({
        error: 'Email and password do not match'
      });
    }
    const token = jwt.sign({
        id: user._id
      },
      process.env.JWT_SECRET
    );
    user.loginAt = new Date();
    await user.save();
    res.cookie('t', token, {
      expire: new Date() + 9999
    });
    return res.status(OK).json({
      token,
      expire: new Date() + 9999,
      status: OK,
      message: 'Login success!'
    });
  });
};
exports.currentUser = (req, res) => {
  res.status(OK).json({
    data: req.auth
  });
};
exports.editUser = (req, res) => {
  const { auth } = req;
  const { id } = req.query;
  res.status(OK).json({
    status: OK,
    id,
    message: 'Edited'
  });
};
