const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  //false: con trong nguoc lai thi dda book
});
const Seat = mongoose.model('Seat', seatSchema, 'Seat');

module.exports = { Seat, seatSchema };
