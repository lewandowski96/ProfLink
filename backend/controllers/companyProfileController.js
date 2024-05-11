const CompanyProfile = require("../models/companyProfileModel");

const getCompanyProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const profile = await CompanyProfile.find({ user_id });


    if (!profile || profile.length === 0) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }


    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCompanyProfiles = async (req, res) => {
  try {
    const profiles = await CompanyProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCompanyProfile = async (req, res) => {
  console.log(req.body)
  const {
    CompanyName,
    website,
    locationsName,
    foundedYear,
    members,
    industry,
    achievements,
    url,
    about,
  } = req.body;

  let emptyFields = [];

  if (!CompanyName) {
    emptyFields.push("CompanyName");
  }
  if (!locationsName) {
    emptyFields.push("locationsName");
  }
  if (!foundedYear) {
    emptyFields.push("foundedYear");
  }
  if (!members) {
    emptyFields.push("members");
  }
  if (!industry) {
    emptyFields.push("industry");
  }
  if (!about) {
    emptyFields.push("about");
  }
  if (!website) {
    emptyFields.push("website");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields.", emptyFields });
  }
  console.log({ "achievements": achievements });

  try {
    const user_id = req.user._id;
    const companyProfile = await CompanyProfile.create({
      CompanyName,
      locationsName,
      foundedYear,
      members,
      industry,
      website,
      about,
      achievements,
      file:url,
      user_id,
    });

    console.log({ "companyProfile": companyProfile });
    res.status(200).json("companyProfile");

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCompanyProfile = async (req, res) => {
  // TODO
};

const deleteCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOneAndDelete({});

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
  createCompanyProfile,
  getCompanyProfile,
  getAllCompanyProfiles,
  updateCompanyProfile,
  deleteCompanyProfile,
};