const { User } = require('../../../models/User')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const keys = require('../../../config/index')
// let secret_key;

// // const secret_key_staging = "mongodb+srv://hoainam007:F7kOTIOuK7WoGMKp@cluster0-wtz7b.mongodb.net/vexere?retryWrites=true&w=majority"
// const secret_key_staging = process.env.SECRET_KEY_STAGING

// const secret_key_local = process.env.SECRET_KEY_LOCAL
// // const secret_key_local = "mongodb://localhost:27017/fs07-vexere"

// if (process.env.NODE_ENV === "local") {
//     secret_key = secret_key_local

// } else if (process.env.NODE_ENV === "staging") {
//     secret_key = secret_key_staging
// }
// console.log(secret_key)

//thu vien util cho phep viet bcrypt o dang promist mac dinh chi o dang callback
//phuong thuc promisify ho tro chuyen 1 callback thanh 1 promise

/**
 * @todo register new user
 */

// const genSalt = promisify(bcrypt.genSalt)
// const hash = promisify(bcrypt.hash)
//2 ham callback
module.exports.createUser = (req, res, next) => {
    const { email, password, fullName } = req.body;
    const newUser = new User({ email, password, fullName })

    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) return res.json(err)

    //     bcrypt.hash(password, salt, (err, hash) => {
    //         if (err) return res.json(err)
    //         newUser.password = hash;
    //         newUser.save()
    //             .then(user => res.status(200).json(user))
    //             .catch(err => res.status(500).json(err))
    //     })
    // })

    // User.findOne({ email }) // ES6
    //     .then(user => {
    //         if (user) return Promise.reject({ status: 400, message: "Email exists" })
    newUser.save() //truoc khi save sang userschema
        // })
        .then(user => res.status(200).json(user))
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })
}

module.exports.getUsers = (req, res, next) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
}

module.exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            if (!user) return Promise.reject({
                status: 400,
                message: "User not found"
            })
            res.status(200).json(user)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({
                message: err.message
            })
            return res.status(500).json(err)
        })
}

module.exports.deteteUserById = (req, res, next) => {
    const { id } = req.params;
    User.deleteOne({ _id: id })
        .then((result) => {
            if (result.n === 0) return Promise.reject({ //result.n trả về có bao nhiêu đối tượng được tìm thấy
                status: 404,
                message: "Not found"
            })
            res.status(200).json({
                message: "Delete successfully"
            })
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({
                message: err.message
            })

            return res.status(500).json(err)
        })
}


/**
 * @todo: login with credentials: -- no la nhung thong tin khi dang nhap nhu email va pass
 */
const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jwt.sign)

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) return Promise.reject({ status: 404, message: "User not found" })
            // return comparePassword(password, user.password)
            return Promise.all([comparePassword(password, user.password), user])
        })
        .then(res => {
            const isMatch = res[0]
            const user = res[1]

            if (!isMatch) return Promise.reject({ status: 404, message: "Password is incorrect" })

            const payload = {
                email: user.email,
                userType: user.userType
            }
            return jwtSign(
                // console.log(hello),
                payload,
                keys.secret_key,
                { expiresIn: 3600 }
            )

        })
        .then(token => {
            return res.status(200).json({
                message: "login successfully",
                token
            })
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })
}

module.exports.uploadAvatar = (req, res, next) => {
    // console.log(req.file);
    const { email } = req.user;
    User.findOne({ email: email })
        .then(user => {
            user.avatar = req.file.path;
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.json(err))
}