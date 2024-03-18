const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.login(email, password, userType);

    const token = createToken(user._id);

    res.status(200).json({ email, userType, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.signup(email, password, userType);

    const token = createToken(user._id);

    res.status(200).json({ email, userType, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
