const mongoose = require("mongoose");

const rideSharePostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    posterName: {
      type: String,
      required: true,
    },
    posterImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    rideDate: {
      type: Date,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    peopleCount: {
      type: String,
      required: true,
    },
    appliedUsersList: {
      type: Array,
    },
    applied: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RideSharePost", rideSharePostSchema);
