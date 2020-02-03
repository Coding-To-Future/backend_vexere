const { User } = require("../../../models/User");
// const { JwtToken } = require("../../../models/JwtToken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const keys = require("../../../config/index");

//thu vien util cho phep viet bcrypt o dang promist mac dinh chi o dang callback
//phuong thuc promisify ho tro chuyen 1 callback thanh 1 promise

/**
 * @todo register new user
 */

module.exports.createUser = (req, res, next) => {
  const { email, password, fullName } = req.body;
  const newUser = new User({ email, password, fullName });

  newUser
    .save() //truoc khi save sang userschema
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.status)
        return res.status(err.status).json({ message: err.message });
      return res.status(500).json(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({
          status: 400,
          message: "User not found"
        });
      res.status(200).json(user);
    })
    .catch(err => {
      if (err.status)
        return res.status(err.status).json({
          message: err.message
        });
      return res.status(500).json(err);
    });
};

module.exports.deteteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(result => {
      if (result.n === 0)
        return Promise.reject({
          //result.n trả về có bao nhiêu đối tượng được tìm thấy
          status: 404,
          message: "Not found"
        });
      res.status(200).json({
        message: "Delete successfully"
      });
    })
    .catch(err => {
      if (err.status)
        return res.status(err.status).json({
          message: err.message
        });

      return res.status(500).json(err);
    });
};

/**
 * @todo: login with credentials: -- no la nhung thong tin khi dang nhap nhu email va pass
 */
const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      return Promise.all([comparePassword(password, user.password), user]);
    })
    .then(res => {
      const isMatch = res[0];
      const user = res[1];

      if (!isMatch)
        return Promise.reject({
          status: 404,
          message: "Password is incorrect"
        });

      const payload = {
        id: user._id,
        email: user.email,
        userType: user.userType
      };
      return jwtSign(payload, keys.secret_key, { expiresIn: 3600 });
    })

    .then(token => {
      // const newJwtToken = new JwtToken({
      //   // userId: user._id,
      //   token: token
      // });

      // newJwtToken.save();
      return res.status(200).json({
        message: "login successfully",
        token
      });
    })

    // .then(token => {
    //   const newJwtToken = new JwtToken({
    //     // userId: user._id,
    //     token: token
    //   });
    //   // console.log("TCL: module.exports.login -> token", token);
    //   return newJwtToken.save();
    // })

    .catch(err => {
      if (err.status)
        return res.status(err.status).json({ message: err.message });
      return res.status(500).json(err);
    });
};

module.exports.uploadAvatar = (req, res, next) => {
  const { email } = req.user;
  User.findOne({ email: email })
    .then(user => {
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err));
};
