const User = require("../models/userModel");
const GeneralProfile = require("../models/generalProfileModel");
const CompanyProfile = require("../models/companyProfileModel");
const ConsultantTeamProfile = require("../models/consultantTeamProfileModel");
const ConsultantIndiProfile = require("../models/consultantIndividualProfileModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  console.log("req body", req.body);

  let profile = "";

  try {
    const user = await User.login(email, password, userType);

    const token = createToken(user._id);

    if (user.userType === "GENERAL") {
      profile = await GeneralProfile.findOne({ user_id: user._id });
    } else if (user.userType === "BUSINESS") {
      profile = await BusinessProfile.findOne({ user_id: user._id });
    } else if (user.userType === "COMPANY") {
      profile = await CompanyProfile.findOne({ user_id: user._id });
    } else {
      const indi_profile = await ConsultantIndiProfile.findOne({
        user_id: user._id,
      });
      const team_profile = await ConsultantTeamProfile.findOne({
        user_id: user._id,
      });

      if (indi_profile) {
        profile = indi_profile;
      } else if (team_profile) {
        profile = team_profile;
      }
    }

    if (profile) {
      res.status(200).json({ email, userType, token, user: profile });
    } else {
      res.status(200).json({ email, userType, token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.signup(email, password, userType);

    const token = createToken(user._id);

    res.status(200).json({ email, userType, token, user: {} });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
