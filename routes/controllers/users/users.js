const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');

// const { promisify } = require('util');
// const comparePassword = promisify(bcrypt.compare);
// const jwtSign = promisify(jwt.sign);

//thu vien util cho phep viet bcrypt o dang promist mac dinh chi o dang callback
//phuong thuc promisify ho tro chuyen 1 callback thanh 1 promise

/**
 * @todo api for User
 */

module.exports.createUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
};

module.exports.getUserById = async (req, res, next) => {
  res.send(req.user);
};

module.exports.deteteUserById = async (req, res, next) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['fullName', 'email', 'phoneNumber', 'dayOfBirth'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.updatePasswordUser = async (req, res, next) => {
  const { password, newPassword } = req.body;

  try {
    const isMatch = await bcrypt.compare(password, req.user.password);
    if (!isMatch)
      return res.status(400).send({ error: 'Old password is incorrect!' });
    req.user.password = newPassword;
    await req.user.save();
    res.status(200).send({ message: 'Update password successfully!' });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: 'Logout successfully!' });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: 'Logout all device successfully!' });
  } catch (e) {
    res.status(500).send();
  }
};
/**
 * @todo api Avatar
 */
module.exports.uploadAvatar = async (req, res, next) => {
  const { email, avatar } = req.user;
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  User.findOne({ email: email })
    .then((user) => {
      user.avatar = buffer;

      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
};

module.exports.deleteAvatar = (req, res, next) => {
  const { email } = req.user;
  User.findOne({ email: email })
    .then((user) => {
      user.avatar = undefined;
      return user.save();
    })
    .then((user) =>
      res.status(200).json({ message: 'Delete avatar successfully!' })
    )
    .catch((err) => res.json(err));
};

module.exports.getAvatarById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user || !user.avatar)
        return Promise.reject({
          status: 404,
          message: "User not found or User don't have avatar",
        });
      res.set('Content-Type', 'image/jpg');
      return res.send(user.avatar);
    })
    .catch((err) => {
      if (err.status)
        return res.status(err.status).json({
          message: err.message,
        });
      return res.status(500).json(err);
    });
};
