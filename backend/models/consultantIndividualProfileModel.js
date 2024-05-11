const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consultantIndividualProfile = new Schema(
  {
    consultantType: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    yourLocation: {
      type: String,
      required: true,
    },
    yourSelf: {
      type: String,
      required: true,
    },
    schoolsUniversityAttended: {
      type: [
        {
          universityName: String,
          year: Number,
          degree: String,
          fieldOfStudy: String,
          description: String,
        },
      ],
    },
    workExperience: {
      type: [
        {
          nameOfPosition: String,
          companyName: String,
          startDate: Date,
          endDate: Date,
          industryName: String,
        },
      ],
    },
    skills: {
      type: [
        {
          AddSkills: String,
        },
      ],
    },
    projects: {
      type: [
        {
          projectName: String,
          projectDescription: String,
        },
      ],
    },
    expertise: {
      type: [
        {
          expertiseField: String,
          describeExpertise: String,
        },
      ],
    },
    achievements: {
      type: [
        {
          achievementsName: String,
          achievementsDescription: String,
        },
      ],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// needs to keep the name single here. it will pluralize when creating on the mongo db
module.exports = mongoose.model(
  "ConsultantIndividualProfile",
  consultantIndividualProfile
);
