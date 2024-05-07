const Course = require("../models/courseModel.js");
const GeneralProfile = require("../models/generalProfileModel.js");

const createCourse = async (req, res) => {
  try {
    const { name, description, coverImagePath, content } = req.body;

    const user_id = req.user._id;
    const user = await GeneralProfile.findOne({ user_id: user_id });

    const newCourse = new Course({
      name,
      description,
      coverImagePath,
      userImagePath: user.imagePath,
      content,
      createdBy: user,
      enrolledUsers: [],
    });

    await newCourse.save();

    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course_id = req.params.courseId;

    const course = await Course.findByIdAndUpdate(course_id, req.body, {
      new: true,
    });

    res.status(200).json(course);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserCreatedCourses = async (req, res) => {
  try {
    const createdBy = req.user._id;

    const courses = await Course.find({ createdBy: createdBy });

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserEnrolledCourses = async (req, res) => {
  try {
    const user_id = req.user._id;

    const user = await GeneralProfile.findOne({ user_id: user_id });

    const courses = await Promise.all(
      user.enrolledCourses.map((id) => Course.findById(id))
    );

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const user_id = req.user._id;
    const course_id = req.params.courseId;

    console.log(course_id);

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const course = await Course.findOne({ _id: course_id });

    user.enrolledCourses.push(course_id);
    course.enrolledUsers.push(user.user_id);

    user.save();
    course.save();

    const courses = await Promise.all(
      user.enrolledCourses.map((id) => Course.findById(id))
    );

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const leaveCourse = async (req, res) => {
  try {
    const user_id = req.user._id;
    const course_id = req.params.courseId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const course = await Course.findOne({ _id: course_id });

    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id !== course_id
    );
    course.enrolledUsers = course.enrolledUsers.filter(
      (id) => id !== user.user_id
    );

    user.save();
    course.save();

    const courses = await Promise.all(
      user.enrolledCourses.map((id) => Course.findById(id))
    );

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const user_id = req.user._id;
    const course_id = req.params.courseId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const course = await Course.findByIdAndDelete({ _id: course_id });

    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id !== course_id
    );

    user.save();

    const courses = await Promise.all(
      user.enrolledCourses.map((id) => Course.findById(id))
    );

    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getUserCreatedCourses,
  getUserEnrolledCourses,
  enrollCourse,
  leaveCourse,
  deleteCourse,
  updateCourse,
};
