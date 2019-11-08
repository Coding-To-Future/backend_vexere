const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    userType: { type: String, default: "client" },
    avatar: { type: String }
})

const genSalt = promisify(bcrypt.genSalt)
const hash = promisify(bcrypt.hash)

UserSchema.pre("save", function (next) { //save la su kien KO SU  dung arr fun vi se mat con tro this
    // console.log(this);
    const user = this;//this tro den ham func(next)
    if (!user.isModified("password")) return next();
    genSalt(10)
        .then(salt => {
            return hash(user.password, salt)
        })
        .then(hash => {
            user.password = hash;
            next()//sang midd tiep theo, tang xu ly ben duoi, xong ve then ben findone
        })

    //truoc khi save --> hast pw
})


const User = mongoose.model('User', UserSchema, 'User')

module.exports = { User, UserSchema }

