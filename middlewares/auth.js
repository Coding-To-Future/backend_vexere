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
    res
      .status(401)
      .send({ message: 'Access denied. You must log in to continue.' });
  }
};

module.exports.authorize = (userTypeArray) => {
  return async (req, res, next) => {
    const isAdmin = await req.user.userType.includes(userTypeArray);
    try {
      if (!isAdmin)
        throw new Error(
          'Access denied. You are logged in but do not have permission.'
        );
      next();
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
  };
};
