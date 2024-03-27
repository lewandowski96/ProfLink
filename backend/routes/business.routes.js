const express = require("express");

const businessController = require("../controllers/business.controller");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.use(checkAuth);

// Routes for businesses
router.post("/", businessController.createBusiness);
router.get("/:id", businessController.getBusinessById);
router.put("/:id", businessController.updateBusiness);
router.delete("/:id", businessController.deleteBusiness);
router.get("/", businessController.getAllBusinesses);

// Routes for advertisements
router.post("/:id/advertisements", businessController.createAdvertisement);
router.put("/:businessId/advertisements/:adId", businessController.updateAdvertisement);
router.delete("/:businessId/advertisements/:adId", businessController.deleteAdvertisement);
router.get("/:id/advertisements", businessController.getAllAdvertisementsByBusinessId);

// Routes for testimonials
router.post("/:id/testimonials", businessController.createTestimonial);
router.put("/:businessId/testimonials/:testimonialId", businessController.updateTestimonial);
router.delete("/:businessId/testimonials/:testimonialId", businessController.deleteTestimonial);
router.get("/:id/testimonials", businessController.getAllTestimonialsByBusinessId);

module.exports = router; 