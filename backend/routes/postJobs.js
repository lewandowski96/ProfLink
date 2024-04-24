// get the express router so that we can declare routes inside this file.
const express = require("express");

const {
    getAllJobPosts,
    getJobPostsById,
    createJobPost,
    updateJobPost,
    deleteJobPost,

} = require("../controllers/jobPostController");


const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// run this before all the other routes to authenticate the API calls
router.use(checkAuth);

router.get("/", getAllJobPosts);
router.get("/all", getJobPostsById);
router.post("/", createJobPost);
router.put("/edit/:id", updateJobPost);
router.delete("/remove/:id", deleteJobPost);

module.exports = router;
