const { OK, BAD_REQUEST } = require('http-status-codes');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { handleError, handleSuccess } = require('../helper/handle');
const { SELECT_ALL } = require('../helper/userSelect');
const ResizeImage = require('../helper/resizeImage');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select(SELECT_ALL);
  return handleSuccess(res, {
    data: {
      users
    }
  });
};
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) {
    return handleError(res, {
      message: 'User not found'
    });
  }
  return handleSuccess(res, {
    data: {
      user
    }
  });
};
exports.registerUser = async (req, res) => {
  if (req.body.username) {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(BAD_REQUEST).json({
        error: 'username exist'
      });
    }
  }
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(BAD_REQUEST).json({
        error: 'email exist'
      });
    }
  }
  const user = new User(req.body);
  user.save(function(err) {
    if (err) {
      return handleError(res, {
        message: err
      });
    }
    return handleSuccess(res, {
      message: 'Create user success'
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
      return handleError(res, {
        message: 'User with that email does not exist. Please signup.'
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return handleError(res, {
        message: 'Email and password do not match.'
      });
    }
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET
    );
    user.loginAt = new Date();
    await user.save();
    res.cookie('t', token, {
      expire: new Date() + 9999
    });
    return handleSuccess(res, {
      token,
      expire: new Date() + 9999,
      status: OK,
      message: 'Login success!'
    });
  });
};
exports.currentUser = (req, res) => {
  const { auth } = req;
  auth.password = '';
  auth.salt = '';
  return handleSuccess(res, {
    data: auth
  });
};
exports.editUser = async (req, res) => {
  const { id } = req.query;
  if (id !== req.auth.id) {
    return handleError(res, {
      message: 'Not owned'
    });
  }
  const user = await User.findById(id);
  if (req.body.first_name) user.first_name = req.body.first_name;
  if (req.body.last_name) user.last_name = req.body.last_name;
  if (req.body.job) user.first_name = req.body.first_name;
  if (req.body.address) user.address = req.body.address;
  if (req.body.about) user.first_name = req.body.about;
  user.save(error => {
    if (!Object.keys(error).length) {
      return handleError(res, {
        error
      });
    }
    return handleSuccess(res, {
      message: 'Edit success'
    });
  });
};
exports.updatePhoto = async (req, res) => {
  const imagePath = path.join('public/images');
  const fileUpload = new ResizeImage(imagePath);
  const { id } = req.auth;
  const user = await User.findById(id);
  if (!req.file) {
    return handleSuccess(res, { message: 'Please provide an image' });
  }
  try {
    const filename = await fileUpload.save(req.file.buffer);
    user.photo = `${imagePath}/${filename}`;
    user.save(err => {
      if (err) {
        return handleError(res, {
          message: err
        });
      }
      return handleSuccess(res, {
        filename: `${imagePath}/${filename}`
      });
    });
  } catch (error) {
    return handleError(res, {
      message: error
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.remove();
    handleSuccess(res, {
      message: 'Remove user success'
    });
  } else {
    handleError(res, {
      message: 'User not found'
    });
  }
};
