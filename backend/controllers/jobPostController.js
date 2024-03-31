const JobPost = require("../models/jobPostModel");



// get all job posts

const getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await JobPost.find({});
        if (!jobPosts) {
            return res.status(404).json({ error: "No job posts found!" });
        }
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get job post by id
const getJobPostsById = async (req, res) => {

    try {
        const user_id = req.user._id;
        console.log({ userID: user_id })
        if (!user_id) {
            return res.status(404).json({ error: "User id not found!" });
        }

        const jobPost = await JobPost.find({ user_id: user_id });
        if (!jobPost) {
            return res.status(404).json({ error: "Job post not found!" });
        }
        res.status(200).json(jobPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// create job post

const createJobPost = async (req, res) => {

    console.log({ "Thisisbody": req.body })

    const {
        jobTitle,
        locations,
        salary,
        startTime,
        endTime,
        selectedOption
    } = req.body;

    let emptyFields = [];

    if (!jobTitle) {
        emptyFields.push("jobTitle");
    }
    if (!locations) {
        emptyFields.push("locations");
    }
    if (!salary) {
        emptyFields.push("salary");
    }
    if (!startTime) {
        emptyFields.push("startTime");
    }
    if (!endTime) {
        emptyFields.push("endTime");
    }
    if (!selectedOption) {
        emptyFields.push("selectedOption");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all the required fields.", emptyFields });
    }

    try {
        const user_id = req.user._id;
        const jobPost = await JobPost.create({
            jobTitle,
            locations,
            salary,
            startTime,
            endTime,
            selectedOption,
            user_id,
        })

        res.status(200).json(jobPost);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// update job post

const updateJobPost = async (req, res) => {
    try {
        const jobPost = await JobPost.findByIdAndUpdate

            (req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

        if (!jobPost) {
            return res.status(404).json({ error: "Job post not found!" });
        }

        res.status(200).json(jobPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete job post

const deleteJobPost = async (req, res) => {
    try {
        const jobPost = await JobPost.findByIdAndDelete(req.params.id);

        if (!jobPost) {
            return res.status(404).json({ error: "Job post not found!" });
        }

        res.status(200).json(jobPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllJobPosts,
    getJobPostsById,
    createJobPost,
    updateJobPost,
    deleteJobPost,
};













// const getCompanyProfile = async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     const profile = await CompanyProfile.find({ user_id });

//     if (!profile) {
//       return res.status(404).json({ error: "Profile not yet created!" });
//     }

//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getAllCompanyProfiles = async (req, res) => {
//   try {
//     const profiles = await CompanyProfile.find({});
//     res.status(200).json(profiles);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const createCompanyProfile = async (req, res) => {
//   console.log(req.body)
//   const {
//     CompanyName,
//     locationsName,
//     foundedYear,
//     members,
//     industry,
//     about,
//   } = req.body;

//   let emptyFields = [];

//   if (!CompanyName) {
//     emptyFields.push("CompanyName");
//   }
//   if (!locationsName) {
//     emptyFields.push("locationsName");
//   }
//   if (!foundedYear) {
//     emptyFields.push("foundedYear");
//   }
//   if (!members) {
//     emptyFields.push("members");
//   }
//   if (!industry) {
//     emptyFields.push("industry");
//   }
//   if (!about) {
//     emptyFields.push("about");
//   }

//   if (emptyFields.length > 0) {
//     return res
//       .status(400)
//       .json({ error: "Please fill in all the required fields.", emptyFields });
//   }

//   try {
//     const user_id = req.user._id;
//     const companyProfile = await CompanyProfile.create({
//       CompanyName,
//       locationsName,
//       foundedYear,
//       members,
//       industry,
//       about,
//       user_id,
//     });

//     console.log({ "companyProfile": companyProfile });
//     res.status(200).json(companyProfile);

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateCompanyProfile = async (req, res) => {
//   // TODO
// };

// const deleteCompanyProfile = async (req, res) => {
//   try {
//     const profile = await CompanyProfile.findOneAndDelete({});

//     if (!profile) {
//       return res.status(404).json({ error: "Profile not yet created!" });
//     }

//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // export the methods to be used from other places
// module.exports = {
//   createCompanyProfile,
//   getCompanyProfile,
//   getAllCompanyProfiles,
//   updateCompanyProfile,
//   deleteCompanyProfile,
// };
