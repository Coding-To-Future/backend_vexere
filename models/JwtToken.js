const mongoose = require('mongoose');
const jwtTokenSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  token: { type: String, required: true, trim: true },
});
const JwtToken = mongoose.model('JwtToken', jwtTokenSchema, 'JwtToken');

module.exports = JwtToken;
