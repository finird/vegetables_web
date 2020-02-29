const {OK, BAD_REQUEST} = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = (req, res) => {
  return res.status(OK).json({
    status: OK,
    data: {
      ok: 'Data users'
    }
  });
};
exports.getUserById = (req, res) => {
  const {id} = req.params;
  return res.status(OK).json({
    status: OK,
    data: {
      ok: 'Data user by id',
      id,
    }
  });
};
exports.registerUser = (req, res) => {
  const user= new User(req.body);
  user.save(function(err) {
    if (err) {
      return handleError(err);
    }
    res.status(OK).json({
      user
    })
  });
};
exports.loginUser =async (req, res) => {
  let {username, email, password} = req.body;
  let user;
  let options = {};
  if(username ){
    options = {
      username
    }
  } else {
    options = {
      email
    }
  }
  User.findOne(options, (err, user) => {
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
      }else {
        const token = jwt.sign({
          id: user._id,
          roles: user.roles,
          last_name: user.last_name,
          first_name: user.first_name,
          email: user.email,
          address: user.address,
          createAt: user.createAt,
          username: user.username
        }, process.env.JWT_SECRET);
        res.cookie('t', token, {
          expire: new Date()+9999
        });
        return res.status(OK).json({
          token,
          expire: new Date() + 9999,
          status: OK,
          message: "Login success!"
        });
      }
    })

};