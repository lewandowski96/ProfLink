const GeneralProfile = require("../models/generalProfileModel");

const getGeneralProfile = async (req, res) => {
  try {
    const profile = await GeneralProfile.find({});

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGeneralProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    contactNo,
    email,
    sex,
    city,
    country,
    bio,
    schoolsAttended,
    universityAttened,
    currentEmployment,
    previousExperiences,
    skills,
    achievements,
  } = req.body;

  try {
    const generalProfile = await GeneralProfile.create({
      firstName,
      lastName,
      dateOfBirth,
      contactNo,
      email,
      sex,
      city,
      country,
      bio,
      schoolsAttended,
      universityAttened,
      currentEmployment,
      previousExperiences,
      skills,
      achievements,
    });
    res.status(200).json(generalProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGeneralProfile = async (req, res) => {
  // TODO
};

const deleteGeneralProfile = async (req, res) => {
  try {
    const profile = await GeneralProfile.findOneAndDelete({});

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export the methods to be used from other places
module.exports = {
  createGeneralProfile,
  getGeneralProfile,
  updateGeneralProfile,
  deleteGeneralProfile,
};
