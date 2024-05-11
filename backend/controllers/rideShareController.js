const RideSharePost = require("../models/rideSharePostModel");
const RideShareProfile = require("../models/rideShareProfileModel");
const GeneralProfile = require("../models/generalProfileModel");

const getRideSharePosts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const posts = await RideSharePost.find({
      userId: { $ne: user_id },
      status: "CREATED",
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserRideSharePosts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const posts = await RideSharePost.find({
      userId: user_id,
      status: "CREATED",
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserCompletedRideSharePosts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const posts = await RideSharePost.find({
      userId: user_id,
      status: "COMPLETED",
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserAcceptedRideSharePosts = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log("user id", user_id);

    const posts = await RideSharePost.find({
      acceptedUsersList: { $in: user_id.toString() },
      status: "CREATED",
    });

    // console.log("res posrs", posts);

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserTakenRideSharePosts = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log("user id", user_id);

    const posts = await RideSharePost.find({
      acceptedUsersList: { $in: user_id.toString() },
      status: "COMPLETED",
    });

    // console.log("res posrs", posts);

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserRideShareProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    const profile = await RideShareProfile.findOne({ userId: user_id });

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    const { userId, title, start, destination, rideDate } = req.body;

    const rideShareProfile = await RideShareProfile.findOne({ userId: userId });

    const generalProfile = await GeneralProfile.findOne({ user_id: userId });

    const post = await RideSharePost.create({
      userId,
      posterName: generalProfile.firstName + " " + generalProfile.lastName,
      posterImage: generalProfile.profileImagePath,
      title,
      start,
      destination,
      rideDate,
      vehicle: rideShareProfile.vehicleModel,
      vehicleType: rideShareProfile.vehicleType,
      peopleCount: rideShareProfile.noOfPassengers,
      applied: [],
      appliedUsersList: [],
      accepted: [],
      acceptedUsersList: [],
      status: "CREATED",
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRideShareProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log(req.body);

    const {
      agreementCheck,
      nationalIdImageBase64,
      userType,
      driversLicenceImageBase64,
      vehicleType,
      vehicleModel,
      noOfPassengers,
    } = req.body;

    console.log("comes here");

    const profile = await GeneralProfile.findOne({ user_id });

    const rideShareProfile = await RideShareProfile.create({
      userId: user_id,
      userImage: profile.profileImagePath,
      firstName: profile.firstName,
      lastName: profile.lastName,
      agreementCheck,
      nationalIdImageBase64,
      userType,
      driversLicenceImageBase64,
      vehicleType,
      vehicleModel,
      noOfPassengers,
      approvalStatus: "PENDING",
      ridesGone: 0,
      rating: 0,
    });

    // updating the general profile
    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    profile.rideSharingProfileCreated = true;

    await profile.save();

    res
      .status(200)
      .json({ profile: profile, rideShareProfile: rideShareProfile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const applyToRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    const { postId } = req.body;

    const rideShareprofile = await RideShareProfile.findOne({
      userId: user_id,
    });

    const post = await RideSharePost.findOne({ _id: postId });

    if (post.applied) {
      post.applied.push(rideShareprofile);
    } else {
      post.applied = [rideShareprofile];
    }

    if (post.appliedUsersList) {
      post.appliedUsersList.push(user_id);
    } else {
      post.appliedUsersList = [user_id];
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const withdrawFromRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    console.log("udsdasd", user_id);

    const { postId } = req.body;

    const rideShareprofile = await RideShareProfile.findOne({
      userId: user_id,
    });

    const post = await RideSharePost.findOne({ _id: postId });

    if (post.applied) {
      post.applied = post.applied.filter(
        (u) => String(u.userId) !== String(user_id)
      );
    }

    if (post.appliedUsersList) {
      post.appliedUsersList = post.appliedUsersList.filter(
        (id) => String(id) !== String(user_id)
      );
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const declineUserFromRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    const { postId, userId } = req.body;

    const post = await RideSharePost.findOne({ _id: postId });

    if (post.applied) {
      post.applied = post.applied.filter(
        (u) => String(u.userId) !== String(userId)
      );
    }

    if (post.appliedUsersList) {
      post.appliedUsersList = post.appliedUsersList.filter(
        (id) => String(id) !== String(userId)
      );
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptUserFromRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    const { postId, userId } = req.body;

    const post = await RideSharePost.findOne({ _id: postId });

    const rideShareprofile = await RideShareProfile.findOne({
      userId: userId,
    });

    if (post.applied) {
      post.applied = post.applied.filter(
        (u) => String(u.userId) !== String(userId)
      );
    }

    if (post.appliedUsersList) {
      post.appliedUsersList = post.appliedUsersList.filter(
        (id) => String(id) !== String(userId)
      );
    }

    if (post.accepted) {
      post.accepted.push(rideShareprofile);
    } else {
      post.accepted = [rideShareprofile];
    }

    if (post.acceptedUsersList) {
      post.acceptedUsersList.push(userId);
    } else {
      post.acceptedUsersList = [userId];
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const completeRideSharePost = async (req, res) => {
  try {
    const user_id = req.user._id;

    const { postId } = req.body;

    const post = await RideSharePost.findOne({ _id: postId });

    post.status = "COMPLETED";

    await post.save();

    // update poster's ride count

    const posterRideShareprofile = await RideShareProfile.findOne({
      userId: user_id,
    });

    posterRideShareprofile.ridesGone = posterRideShareprofile.ridesGone + 1;

    console.log("pasta", posterRideShareprofile);

    await posterRideShareprofile.save();

    // update passengers ride count

    post.acceptedUsersList.map(async (userId) => {
      const rideShareProfile = await RideShareProfile.findOne({
        userId: userId,
      });

      rideShareProfile.ridesGone = rideShareProfile.ridesGone + 1;

      await rideShareProfile.save();
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRideSharePosts,
  getUserRideSharePosts,
  getUserAcceptedRideSharePosts,
  createRideSharePost,
  createRideShareProfile,
  getUserRideShareProfile,
  applyToRideSharePost,
  withdrawFromRideSharePost,
  acceptUserFromRideSharePost,
  declineUserFromRideSharePost,
  completeRideSharePost,
  getUserCompletedRideSharePosts,
  getUserTakenRideSharePosts,
};
