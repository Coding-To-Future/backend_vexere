const nodemailer = require('nodemailer');
const fs = require('fs') //buildin co san cua nodejs
const hogan = require('hogan.js')
const template = fs.readFileSync('services/email/bookingTicketEmailTemplate.hjs', 'utf-8'); //dung tu sever doc vao
const compiledTemplate = hogan.compile(template);

const keys = require('../../config/index')

module.exports.sendBookingTicketEmail = (ticket, trip, user) => {
    const transpost = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTSL: true,
        requireSSL: true,
        auth: {
            user: keys.email,
            pass: keys.password
        }
        // host: "smtp.mailtrap.io",
        // port: 2525,
        // auth: {
        //     user: "9b22e6d2c91943",
        //     pass: "81d90c1ad6b347"
        // }
    }

    const transporter = nodemailer.createTransport(transpost)
    const mailOptions = {
        form: keys.email,
        // form: "smtp.mailtrap.io",
        to: user.email,
        subject: "Mail xac nhan mua ve thanh cong",
        // html: "cam on ban da mua ve"
        html: compiledTemplate.render({
            email: user.email,
            fromStation: `${trip.fromStation.name}, ${trip.fromStation.province}`,
            toStation: `${trip.toStation.name}, ${trip.toStation.province}`,
            price: trip.price,
            amount: ticket.seats.length,
            seats: ticket.seats.map(e => e.code).toString(),
            //     //string thi moi render html dc, array ko dc
            // total: amount * price
            total: ticket.seats.length * trip.price
            //truyen gia tri dong vao, tempale staing
        })
    }

    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err.message)
        console.log("Email was successfully sent!")
    })
}