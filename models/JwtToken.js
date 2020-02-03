const mongoose = require("mongoose");
const JwtTokenSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  token: { type: String, required: true }
});
const JwtToken = mongoose.model("JwtToken", JwtTokenSchema, "JwtToken");

module.exports = {
  JwtToken,
  JwtTokenSchema
};
