const express = require("express");
const {
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

router.get("/myCourses", checkAuth, getUserEnrolledCourses);

router.get("/createdCourses", checkAuth, getUserCreatedCourses);

router.patch("/:courseId/enroll", checkAuth, enrollCourse);

router.patch("/:courseId/leave", checkAuth, leaveCourse);

router.delete("/:courseId", checkAuth, deleteCourse);

module.exports = router;
