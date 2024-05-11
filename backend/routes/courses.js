const express = require("express");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getAllCourses,
  getUserCreatedCourses,
  getUserEnrolledCourses,
  leaveCourse,
} = require("../controllers/courseController");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, getAllCourses);

router.post("/", checkAuth, createCourse);

router.put("/:id", checkAuth, updateCourse);

router.get("/myCourses", checkAuth, getUserEnrolledCourses);

router.get("/createdCourses", checkAuth, getUserCreatedCourses);

router.patch("/:courseId/enroll", checkAuth, enrollCourse);

router.patch("/:courseId/leave", checkAuth, leaveCourse);

router.delete("/:courseId", checkAuth, deleteCourse);

module.exports = router;
