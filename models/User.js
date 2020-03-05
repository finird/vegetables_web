const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

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
    enum: ['GUEST', 'ADMIN', 'EDIT', 'RECEPTIONIST'],
    default: 'GUEST',
    require: true
  },
  salt: {
    type: String,
    require: true
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

userSchema.pre('save', function(next) {
  const user = this;
  user.salt = bcrypt.genSaltSync(12);
  bcrypt.hash(user.password, this.salt, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods = {
  authenticate: async function(password) {
    const hash = await bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }
};
const User = mongoose.model('User', userSchema, 'User');
module.exports = User;
