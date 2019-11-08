const mongoose = require('mongoose');
const {
    SeatSchema
} = require('./Seat')

const TripSchema = new mongoose.Schema({
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    startTime: {
        type: Date,
        required: true
    },
    seats: [SeatSchema],
    price: {
        type: Number,
        required: true
    }
    //false: con trong nguoc lai thi

})
const Trip = mongoose.model('Trip', TripSchema, 'Trip')

module.exports = {
    Trip,
    TripSchema
}