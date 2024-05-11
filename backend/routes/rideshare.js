const express = require("express");

const {
  getRideSharePosts,
  getUserRideSharePosts,
  createRideSharePost,
  createRideShareProfile,
  getUserRideShareProfile,
  applyToRideSharePost,
  withdrawFromRideSharePost,
} = require("../controllers/rideShareController");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, getRideSharePosts);

router.get("/myPosts", checkAuth, getUserRideSharePosts);

router.post("/", checkAuth, createRideSharePost);

router.get("/profile", checkAuth, getUserRideShareProfile);

router.post("/profile", checkAuth, createRideShareProfile);

router.post("/apply", checkAuth, applyToRideSharePost);

router.post("/withdraw", checkAuth, withdrawFromRideSharePost);

module.exports = router;
