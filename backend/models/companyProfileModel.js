const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyProfileSchema = new Schema(
  {
    CompanyName: {
      type: String,
      required: true,
    },
    locationsName: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    foundedYear: {
      type: Date,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// needs to keep the name single here. it will pluralize when creating on the mongo db
module.exports = mongoose.model("CompanyProfile", companyProfileSchema);
