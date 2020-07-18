const mongoose = require('mongoose');

const { seatSchema } = require('./Seat');

const ticketSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    seats: [seatSchema],
    totalPrice: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Price must be a positive number');
            }
        },
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema, 'Ticket');

module.exports = Ticket;
