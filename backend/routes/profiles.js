// get the express router so that we can declare routes inside this file.
const express = require("express");
const {
  createGeneralProfile,
  getGeneralProfile,
  updateGeneralProfile,
  deleteGeneralProfile,
} = require("../controllers/generalProfileController");

const router = express.Router();

router.get("/general", getGeneralProfile);
router.post("/general", createGeneralProfile);
router.patch("/general", updateGeneralProfile);
router.delete("/general", deleteGeneralProfile);

router.get("/consultant", (req, res) => {
  res.json({ msg: "GET consultant profile data" });
});

router.post("/consultant", (req, res) => {
  res.json({ msg: "POST consultant profile data" });
});

router.patch("/consultant", (req, res) => {
  res.json({ msg: "UPDATE consultant profile data" });
});

router.get("/business", (req, res) => {
  res.json({ msg: "GET business profile data" });
});

router.post("/business", (req, res) => {
  res.json({ msg: "POST business profile data" });
});

router.patch("/business", (req, res) => {
  res.json({ msg: "UPDATE business profile data" });
});

router.get("/employer", (req, res) => {
  res.json({ msg: "GET employer profile data" });
});

router.post("/employer", (req, res) => {
  res.json({ msg: "POST employer profile data" });
});

router.patch("/employer", (req, res) => {
  res.json({ msg: "UPDATE employer profile data" });
});

module.exports = router;
