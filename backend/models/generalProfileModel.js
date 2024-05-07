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
    profileImagePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    sentRequests: {
      type: Array,
      default: [],
    },
    receivedRequests: {
      type: Array,
      default: [],
    },
    enrolledCourses: {
      type: Array,
      default: [],
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
      type: Array,
      required: true,
    },
    universityAttendedName: {
      type: String,
    },
    universityAttendedYear: {
      type: Number,
    },
    universityAttendedDegree: {
      type: String,
    },
    currentEmploymentCompany: {
      type: String,
    },
    currentEmploymentPosition: {
      type: String,
    },
    currentEmploymentIndustry: {
      type: String,
    },
    previousExperiences: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    achievements: {
      type: Array,
    },
    twitterHandle: {
      type: String,
    },
    linkedinHandle: {
      type: String,
    },
    rideSharingProfileCreated: {
      type: Boolean,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// needs to keep the name single here. it will pluralize when creating on the mongo db
module.exports = mongoose.model("GeneralProfile", generalProfileSchema);
