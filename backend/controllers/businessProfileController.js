const BusinessProfile = require("../models/businessProfileModel");

const getBusinessProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const profile = await BusinessProfile.findOne({ user_id });

    console.log(profile);

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

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push("firstName");
  }
  if (!lastName) {
    emptyFields.push("lastName");
  }
  if (!dateOfBirth) {
    emptyFields.push("dateOfBirth");
  }
  if (!contactNo) {
    emptyFields.push("contactNo");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!sex) {
    emptyFields.push("sex");
  }
  if (!city) {
    emptyFields.push("city");
  }
  if (!country) {
    emptyFields.push("country");
  }
  if (!bio) {
    emptyFields.push("bio");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields.", emptyFields });
  }

  try {
    const user_id = req.user._id;
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
      user_id,
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
