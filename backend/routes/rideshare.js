const express = require("express");

const {
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
} = require("../controllers/rideShareController");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, getRideSharePosts);

router.get("/myPosts", checkAuth, getUserRideSharePosts);

router.get("/myAcceptedPosts", checkAuth, getUserAcceptedRideSharePosts);

router.post("/", checkAuth, createRideSharePost);

router.get("/profile", checkAuth, getUserRideShareProfile);

router.post("/profile", checkAuth, createRideShareProfile);

router.post("/apply", checkAuth, applyToRideSharePost);

router.post("/withdraw", checkAuth, withdrawFromRideSharePost);

router.post("/accept", checkAuth, acceptUserFromRideSharePost);

router.post("/decline", checkAuth, declineUserFromRideSharePost);

router.post("/complete", checkAuth, completeRideSharePost);

module.exports = router;
