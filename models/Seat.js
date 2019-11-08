const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
    //false: con trong nguoc lai thi dda book
})
const Seat = mongoose.model('Seat', SeatSchema, 'Seat')

module.exports = {
    Seat,
    SeatSchema
}