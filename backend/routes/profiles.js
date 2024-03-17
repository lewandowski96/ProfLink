// get the express router so that we can declare routes inside this file.
const express = require("express");

const {
  createGeneralProfile,
  getGeneralProfile,
  getAllGeneralProfiles,
  updateGeneralProfile,
  deleteGeneralProfile,
} = require("../controllers/generalProfileController");

const {
  createConsultantIndividualProfile,
  createConsultantTeamProfile,
  getConsultantProfile,
  getAllConsultantIndividualProfiles,
  getAllConsultantTeamProfiles,
  updateConsultantIndividualProfile,
  updateConsultantTeamProfile,
  deleteConsultantIndividualProfile,
  deleteConsultantTeamProfile,
} = require("../controllers/consultantProfileController");

const {
  createCompanyProfile,
  getCompanyProfile,
  getAllCompanyProfiles,
  updateCompanyProfile,
  deleteCompanyProfile,
} = require("../controllers/companyProfileController");

const {
  createBusinessProfile,
  getBusinessProfile,
  getAllBusinessProfiles,
  updateBusinessProfile,
  deleteBusinessProfile,
} = require("../controllers/businessProfileController");

const router = express.Router();

router.get("/general", getGeneralProfile);
router.get("/general/all", getAllGeneralProfiles);
router.post("/general", createGeneralProfile);
router.patch("/general", updateGeneralProfile);
router.delete("/general", deleteGeneralProfile);

router.get("/consultant", getConsultantProfile);
router.get("/consultant/individual/all", getAllConsultantIndividualProfiles);
router.get("/consultant/team/all", getAllConsultantTeamProfiles);
router.post("/consultant/individual", createConsultantIndividualProfile);
router.post("/consultant/team", createConsultantTeamProfile);
router.patch("/consultant/individual", updateConsultantIndividualProfile);
router.patch("/consultant/team", updateConsultantTeamProfile);
router.delete("/consultant/individual", deleteConsultantIndividualProfile);
router.delete("/consultant/team", deleteConsultantTeamProfile);

router.get("/company", getCompanyProfile);
router.get("/company/all", getAllCompanyProfiles);
router.post("/company", createCompanyProfile);
router.patch("/company", updateCompanyProfile);
router.delete("/company", deleteCompanyProfile);

router.get("/business", getBusinessProfile);
router.get("/business/all", getAllBusinessProfiles);
router.post("/business", createBusinessProfile);
router.patch("/business", updateBusinessProfile);
router.delete("/business", deleteBusinessProfile);

module.exports = router;
