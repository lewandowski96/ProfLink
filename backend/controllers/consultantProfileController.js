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
    fullName,
    userName,
    email,
    contactNo,
    yourLocation,
    yourSelf,
    schoolsUniversityAttended,
    degree,
    fieldOfStudy,
    description,
    workExperience,
    nameOfPosition,
    companyName,
    startDate,
    endDate,
    industryName,
    AddSkills,
    skills,
    achievementsName,
    achievementsDescription,
    projectName,
    projectDescription,
    expertiseField,
    describeExpertise,
  } = req.body;

  let emptyFields = [];

  if (!fullName) {
    emptyFields.push("fullName");
  }
  if (!userName) {
    emptyFields.push("userName");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!contactNo) {
    emptyFields.push("contactNo");
  }
  if (!yourLocation) {
    emptyFields.push("yourLocation");
  }
  if (!yourSelf) {
    emptyFields.push("yourSelf");
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
        fullName,
        userName,
        email,
        contactNo,
        yourLocation,
        yourSelf,
        schoolsUniversityAttended,
        degree,
        fieldOfStudy,
        description,
        workExperience,
        nameOfPosition,
        companyName,
        startDate,
        endDate,
        industryName,
        AddSkills,
        skills,
        achievementsName,
        achievementsDescription,
        projectName,
        projectDescription,
        expertiseField,
        describeExpertise,
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
    fullName,
    email,
    Addmember,
    contactNo,
    degree,
    fieldOfStudy,
    description,
    workExperience,
    nameOfPosition,
    companyName,
    startDate,
    endDate,
    industryName,
    AddSkills,
    skills,
    achievementsName,
    achievementsDescription,
    projectName,
    projectDescription,
    expertiseField,
    describeExpertise,
  } = req.body;

  let emptyFields = [];

  if (!fullName) {
    emptyFields.push("fullName");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if(!Addmember) {
    emptyFields.push("Addmember");
  }
  if (!contactNo) {
    emptyFields.push("contactNo");
  }
  if (!workExperience) {
    emptyFields.push("workExperience");
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
      fullName,
      email,
      Addmember,
      contactNo,
      degree,
      fieldOfStudy,
      description,
      workExperience,
      nameOfPosition,
      companyName,
      startDate,
      endDate,
      industryName,
      AddSkills,
      skills,
      achievementsName,
      achievementsDescription,
      projectName,
      projectDescription,
      expertiseField,
      describeExpertise,
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
