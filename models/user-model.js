const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String
});

module.exports = User = mongoose.model("user", userSchema);
