const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generalProfileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    schoolsAttended: {
      type: [
        {
          schoolName: String,
          year: Number,
        },
      ],
      required: true,
    },
    universityAttened: {
      type: {
        universityName: String,
        year: Number,
        degree: String,
      },
    },
    currentEmployment: {
      type: {
        company: String,
        position: String,
        industry: String,
      },
    },
    previousExperiences: {
      type: [
        {
          position: String,
          company: String,
          year: Number,
          industry: String,
        },
      ],
    },
    skills: {
      type: [
        {
          name: String,
          level: String,
        },
      ],
    },
    achievements: {
      type: [
        {
          name: String,
          multimedia: String,
          media_type: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// needs to keep the name single here. it will pluralize when creating on the mongo db
module.exports = mongoose.model("GeneralProfile", generalProfileSchema);
