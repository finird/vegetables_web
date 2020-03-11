const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const userRoles = require('../constant/userRoles');

const userSchema = new Schema({
  last_name: {
    type: String,
    default: '',
    min: [2, 'Least 2 characters'],
    max: [20, 'Max 20 characters'],
    trim: true
  },
  first_name: {
    type: String,
    default: '',
    min: [2, 'Least 2 characters'],
    max: [20, 'Max 20 characters'],
    trim: true
  },
  username: {
    type: String,
    min: [2, 'Least 2 characters'],
    max: [40, 'Max 40 characters'],
    require: [true, 'username is required!'],
    unique: [true, 'username existed'],
    trim: true
  },
  email: {
    type: String,
    min: 10,
    max: 40,
    require: [true, 'username is required!'],
    unique: [true, 'email existed'],
    validate: {
      validator: function(value) {
        const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(value).toLocaleLowerCase());
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    min: 8,
    max: 50,
    require: [true, 'password is required!']
  },
  roles: {
    type: String,
    enum: [
      userRoles.Guest,
      userRoles.Admin,
      userRoles.Edit,
      userRoles.Receptionist
    ],
    default: userRoles.Guest,
    require: true
  },
  salt: {
    type: String,
    require: false,
    default: null
  },
  job: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  loginAt: {
    type: Date,
    default: Date.now()
  },
  address: {
    type: String,
    default: '',
    max: 100,
    trim: true
  },
  photo: {
    type: String
  },
  about: {
    type: String,
    trim: true
  }
});
userSchema.pre('save', async function(next) {
  const user = this;
  if (this.isNew) {
    user.salt = await bcrypt.genSaltSync(12);
    const hash = await bcrypt.hashSync(user.password, this.salt);
    user.password = hash;
    next();
  }
  next();
});

userSchema.methods = {
  authenticate: function(password) {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }
};
const User = mongoose.model('User', userSchema, 'User');
exports.UserModel = userSchema;
module.exports = User;
