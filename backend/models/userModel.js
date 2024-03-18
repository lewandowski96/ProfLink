const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password, userType) {
  if (!email || !password || !userType) {
    throw Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }

  const exists = await this.findOne({ email, userType });

  if (exists) {
    throw Error("A user has been created with this email already.");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, userType });

  return user;
};

userSchema.statics.login = async function (email, password, userType) {
  if (!email || !password || !userType) {
    throw Error("All fields are required.");
  }

  const user = await this.findOne({ email, userType });

  if (!user) {
    throw Error("Invalid email or wrong user type");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
