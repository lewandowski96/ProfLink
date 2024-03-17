const BusinessProfile = require("../models/generalProfileModel");

const getBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.find({});

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBusinessProfiles = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBusinessProfile = async (req, res) => {
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
    const businessProfile = await BusinessProfile.create({
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
    res.status(200).json(businessProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBusinessProfile = async (req, res) => {
  // TODO
};

const deleteBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOneAndDelete({});

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
  createBusinessProfile,
  getBusinessProfile,
  getAllBusinessProfiles,
  updateBusinessProfile,
  deleteBusinessProfile,
};
