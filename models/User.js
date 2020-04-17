const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contant "password"');
      }
    },
  },
  fullName: { type: String, required: true, trim: true },
  userType: { type: String, default: 'client' },
  phoneNumber: { type: String, trim: true, maxlength: 10 },
  dayOfBirth: { type: String, trim: true },
  avatar: { type: Buffer },
});

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

userSchema.pre('save', function (next) {
  //save la su kien KO SU  dung arr fun vi se mat con tro this
  const user = this; //this tro den ham func(next)
  if (!user.isModified('password')) return next();
  genSalt(10)
    .then((salt) => {
      return hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next(); //sang midd tiep theo, tang xu ly ben duoi, xong ve then ben findone
    });
  //truoc khi save --> hast pw
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.avatar;
  return userObject;
};

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
