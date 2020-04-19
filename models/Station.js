const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  province: { type: String, required: true, trim: true },
});
const Station = mongoose.model('Station', stationSchema, 'Station');

module.exports = Station;
