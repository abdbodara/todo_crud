const mongoose = require("mongoose");

const SignupData = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minimum: 8,
  },
});
module.exports = mongoose.model("user", SignupData);
