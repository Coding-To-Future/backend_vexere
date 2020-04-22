const mongoose = require('mongoose');

const { seatSchema } = require('./Seat');

const tripSchema = new mongoose.Schema(
  {
    fromStation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Station',
    },
    toStation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Station',
    },
    startTime: {
      type: Date,
      required: true,
      trim: true,
    },
    seats: [seatSchema],
    price: {
      type: Number,
      required: true,
      trim: true,
      // default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Price must be a positive number');
        }
      },
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema, 'Trip');

module.exports = Trip;
