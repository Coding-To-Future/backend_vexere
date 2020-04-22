const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/Ticket');
const keys = require('../config/index');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  fullName: { type: String, required: true, trim: true },
  userType: { type: String, default: 'client' },
  phoneNumber: { type: String, required: true, trim: true, maxlength: 10 },
  dayOfBirth: { type: String, required: true, trim: true },
  avatar: { type: Buffer },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.virtual('ticket', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, keys.secret_key, {
    expiresIn: 3600,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found!');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect!');
  }
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  if (user.isModified('dayOfBirth')) {
    user.dayOfBirth = moment(user.dayOfBirth).format('DD/MM/YYYY');
  }
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Ticket.deleteMany({ userId: user._id });
  next();
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
