const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImagePath: {
      type: String,
    },
    userImagePath: {
      type: String,
    },
    content: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    enrolledUsers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
