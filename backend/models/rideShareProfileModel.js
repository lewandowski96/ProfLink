const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rideShareProfileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    agreementCheck: {
      type: Boolean,
      required: true,
    },
    nationalIdImageBase64: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    driversLicenceImageBase64: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    vehicleModel: {
      type: String,
    },
    noOfPassengers: {
      type: Number,
    },
    approvalStatus: {
      type: String,
      required: true,
    },
    ridesGone: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RideShareProfile", rideShareProfileSchema);
