const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const veryfyJwt = promisify(jwt.verify)
const keys = require('../config/index')

module.exports.authenticate = (req, res, next) => {
    const token = req.header("token")
    veryfyJwt(token, keys.secret_key) //xac nhan token nhap vao dung hay sai, neu dung chay .then, sai chay .catch
        .then((decoded) => {
            if (decoded) { //decoded neu co ton tai thi thuc hien gan req.user de dung cho authorize, ko thi nhay xuong .catch
                req.user = decoded;
                return next()
            }
        })
        .catch(() => res.status(401).json({ message: "User is not authentecated" }))
}

module.exports.authorize = (userTypeArray) => {
    return (req, res, next) => {
        const { user } = req;
        if (userTypeArray.findIndex(elm => elm === user.userType) > -1) return next()
        // if (userType === user.userType) return next()
        return res.status(403).json({
            message: "Ban da dang nhap nhung ko co quyen xem"
        })
    }
}

// module.exports.uploadAvatar = (req, res, next) => {
//     const { email } = req.user;
//     User.findOne({ email })
//         .then(user => {
//             user.avatar = req.file.path;
//             return user.save()
//         })
//         .then(user => res.status(200).json(user))
//         .catch(err => res.json(err))
// }

