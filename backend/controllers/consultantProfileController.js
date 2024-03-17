const ConsultantIndividualProfile = require("../models/consultantIndividualProfileModel");
const ConsultantTeamProfile = require("../models/consultantTeamProfileModel");

const getConsultantProfile = async (req, res) => {
  try {
    const profile = await ConsultantIndividualProfile.find({});

    if (!profile) {
      const teamProfile = await ConsultantTeamProfile.find({});
    }
    if (!teamProfile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllConsultantIndividualProfiles = async (req, res) => {
  try {
    const profiles = await ConsultantIndividualProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllConsultantTeamProfiles = async (req, res) => {
  try {
    const profiles = await ConsultantTeamProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createConsultantIndividualProfile = async (req, res) => {
  const {
    consultantType,
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
    const consultantIndividualProfile =
      await ConsultantIndividualProfile.create({
        consultantType,
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
    res.status(200).json(consultantIndividualProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createConsultantTeamProfile = async (req, res) => {
  const {
    consultantType,
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
    const consultantTeamProfile = await ConsultantTeamProfile.create({
      consultantType,
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
    res.status(200).json(consultantTeamProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateConsultantIndividualProfile = async (req, res) => {
  // TODO
};

const updateConsultantTeamProfile = async (req, res) => {
  // TODO
};

const deleteConsultantIndividualProfile = async (req, res) => {
  // TODO
};

const deleteConsultantTeamProfile = async (req, res) => {
  // TODO
};

// export the methods to be used from other places
module.exports = {
  createConsultantIndividualProfile,
  createConsultantTeamProfile,
  getConsultantProfile,
  getAllConsultantIndividualProfiles,
  getAllConsultantTeamProfiles,
  updateConsultantIndividualProfile,
  updateConsultantTeamProfile,
  deleteConsultantIndividualProfile,
  deleteConsultantTeamProfile,
};
