const ConsultantIndividualProfile = require("../models/consultantIndividualProfileModel");
const ConsultantTeamProfile = require("../models/consultantTeamProfileModel");

const getConsultantProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const profile = await ConsultantIndividualProfile.find({ user_id });

    // if (profile) {
    //   res.status(200).json(profile);
    // } else {
    //   const teamProfile = await ConsultantTeamProfile.find({ user_id });
    //   if (teamProfile) {
    //     res.status(200).json(teamProfile);
    //   }
    // }

    if (profile) {
      res.status(200).json(profile);
    }

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    // if (!teamProfile) {
    //   return res.status(404).json({ error: "Profile not yet created!" });
    // }
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
    const consultantType = "INDIVIDUAL";

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
        user_id,
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
    const consultantType = "TEAM";

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
      user_id,
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
