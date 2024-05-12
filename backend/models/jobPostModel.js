const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobPostSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    locations: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    userPhoto: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
