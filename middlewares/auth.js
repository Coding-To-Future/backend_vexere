const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
// const veryfyJwt = promisify(jwt.verify);
const keys = require('../config/index');
const User = require('../models/User');

module.exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, keys.secret_key);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate!' });
  }
};

module.exports.authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;
    if (userTypeArray.findIndex((elm) => elm === user.userType) > -1)
      return next();
    // if (userType === user.userType) return next()
    return res.status(403).json({
      message: 'Ban da dang nhap nhung ko co quyen xem',
    });
  };
};
