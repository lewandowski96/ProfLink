const express = require("express");

const {
  createGeneralProfile,
  updateGeneralProfile,
  getGeneralProfile,
  getUserFriends,
  getUserFollowers,
  sendUnsendRequests,
  followUnfollowBusiness,
  getReceivedRequests,
  getSentRequests,
  acceptFriendRequest,
  declineFriendRequest,
  unfriendFriend,
} = require("../controllers/generalProfileController");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, getGeneralProfile);

router.post("/", checkAuth, createGeneralProfile);

router.put("/", checkAuth, updateGeneralProfile);

router.get("/friends", checkAuth, getUserFriends);

router.get("/followers", checkAuth, getUserFollowers);

router.patch("/sendUnsend/:friendId", checkAuth, sendUnsendRequests);

router.get("/receivedRequests", checkAuth, getReceivedRequests);

router.get("/sentRequests", checkAuth, getSentRequests);

router.patch("/acceptRequest/:friendId", checkAuth, acceptFriendRequest);

router.patch("/unfriend/:friendId", checkAuth, unfriendFriend);

router.patch("/declineRequest/:friendId", checkAuth, declineFriendRequest);

router.patch("/follow/:businessId", checkAuth, followUnfollowBusiness);

module.exports = router;
