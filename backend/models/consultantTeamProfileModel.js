const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consultantTeamProfileSchema = new Schema(
  {
    consultantType: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Addmember: {
      type: [
        {
          memberName: String,
          memberEmail: String,
          memberContactNo: Number,
        },
      ],
    },
    contactNo: {
      type: Number,
      required: true,
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
    achievements: {
      type: [
        {
          achievementsName: String,
          achievementsDescription: String,
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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// needs to keep the name single here. it will pluralize when creating on the mongo db
module.exports = mongoose.model(
  "ConsultantTeamProfile",
  consultantTeamProfileSchema
);
