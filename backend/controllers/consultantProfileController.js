const ConsultantIndividualProfile = require("../models/consultantIndividualProfileModel");
const ConsultantTeamProfile = require("../models/consultantTeamProfileModel");

const getConsultantProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log("comes here");

    const profile = await ConsultantIndividualProfile.findOne({
      user_id,
    });

    const teamProfile = await ConsultantTeamProfile.findOne({ user_id });

    console.log("comes here");

    if (!profile && !teamProfile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    console.log("comes here yooo");

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(200).json(teamProfile);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConsultantProfileById = async (req, res) => {
  try {
    const user_id = req.params.consultantId;

    console.log(req.params);

    const profile = await ConsultantIndividualProfile.findOne({
      user_id: user_id,
    });

    const teamProfile = await ConsultantTeamProfile.findOne({
      user_id: user_id,
    });

    console.log("comes here");

    if (!profile && !teamProfile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    console.log("comes here yooo");

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(200).json(teamProfile);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConsultantTeamProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    const profile = await ConsultantTeamProfile.findOne({ user_id });

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConsultantIndividualProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    const profile = await ConsultantIndividualProfile.findOne({ user_id });

    if (!profile) {
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
    fullName,
    userName,
    userImage,
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
    expertiseField,
    describeExpertise,
    skills,
    achievements,
    projects,
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
        userImage,
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
        achievements,
        projects,
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
    teamImage,
    email,
    Addmember,
    contactNo,
    industryName,
    achievements,
    projects,
    expertise,
  } = req.body;

  let emptyFields = [];

  if (!fullName) {
    emptyFields.push("fullName");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!Addmember) {
    emptyFields.push("Addmember");
  }
  if (!contactNo) {
    emptyFields.push("contactNo");
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
      teamImage,
      email,
      teamMembers: Addmember,
      contactNo,
      industryName,
      achievements,
      projects,
      expertise,
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
  const {
    id,
    consultantType,
    fullName,
    teamImage,
    email,
    Addmember,
    contactNo,
    industryName,
    achievements,
    projects,
    expertise,
  } = req.body;

  let emptyFields = [];

  if (!fullName) {
    emptyFields.push("fullName");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!Addmember) {
    emptyFields.push("Addmember");
  }
  if (!contactNo) {
    emptyFields.push("contactNo");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields.", emptyFields });
  }

  try {
    console.log("comes to update");

    const user_id = req.user._id;
    const consultantType = "TEAM";

    const consultantTeamProfile = await ConsultantTeamProfile.findByIdAndUpdate(
      id,
      {
        consultantType,
        fullName,
        teamImage,
        email,
        teamMembers: Addmember,
        contactNo,
        industryName,
        achievements,
        projects,
        expertise,
        user_id,
      },
      { new: true }
    );
    res.status(200).json(consultantTeamProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteConsultantIndividualProfile = async (req, res) => {
  // TODO
};

const deleteConsultantTeamProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log("udsdasd", user_id);

    const id = req.params.id;

    console.log("iddddd", id);

    await ConsultantTeamProfile.findByIdAndDelete(id);

    res.status(200).json("");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
  getConsultantTeamProfile,
  getConsultantIndividualProfile,
  getConsultantProfileById,
};
