const GeneralProfile = require("../models/generalProfileModel");
const BusinessProfile = require("../models/businessProfileModel");

const getGeneralProfile = async (req, res) => {
  try {
    const user_id = req.user._id;

    const profile = await GeneralProfile.findOne({ user_id });

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const user_id = req.user._id;

    const user = await GeneralProfile.findOne({ user_id: user_id });

    if (user.friends) {
      const friends = await Promise.all(
        user.friends.map((id) => GeneralProfile.findOne({ user_id: id }))
      );

      res.status(200).json(friends);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserFollowers = async (req, res) => {
  try {
    const user_id = req.user._id;

    const user = await GeneralProfile.findOne({ user_id: user_id });

    if (user.followers) {
      const businesses = await Promise.all(
        user.followers.map((id) => BusinessProfile.findOne({ user_id: id }))
      );

      res.status(200).json(businesses);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendUnsendRequests = async (req, res) => {
  try {
    const user_id = req.user._id;
    const friend_id = req.params.friendId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const friend = await GeneralProfile.findOne({
      user_id: friend_id,
    });

    if (user.sentRequests.includes(friend_id)) {
      user.sentRequests = user.sentRequests.filter((id) => id !== friend_id);
      friend.receivedRequests = friend.receivedRequests.filter(
        (id) => id !== user_id
      );
    } else {
      user.sentRequests.push(friend.user_id);
      friend.receivedRequests.push(user.user_id);
    }

    await user.save();
    await friend.save();

    res.status(200).json([]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const followUnfollowBusiness = async (req, res) => {
  try {
    const user_id = req.user._id;
    const business_id = req.params.businessId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const business = await BusinessProfile.find({ user_id: business_id });

    if (user.followers.includes(business_id)) {
      user.followers = user.followers.filter((id) => id !== business_id);
    } else {
      user.followers.push(business_id);
    }

    user.save();

    if (user.followers) {
      const businesses = await Promise.all(
        user.followers.map((id) => BusinessProfile.findOne({ user_id: id }))
      );

      res.status(200).json(businesses);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReceivedRequests = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await GeneralProfile.findOne({ user_id: user_id });

    if (user.receivedRequests) {
      const receivedRequests = await Promise.all(
        user.receivedRequests.map((id) =>
          GeneralProfile.findOne({ user_id: id })
        )
      );

      res.status(200).json(receivedRequests);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSentRequests = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await GeneralProfile.findOne({ user_id });

    if (user.sentRequests) {
      const sentRequests = await Promise.all(
        user.sentRequests.map((id) => GeneralProfile.findOne({ user_id: id }))
      );

      console.log(sentRequests);

      res.status(200).json(sentRequests);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const user_id = req.user._id;
    const friend_id = req.params.friendId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const friend = await GeneralProfile.findOne({ user_id: friend_id });

    user.receivedRequests = user.receivedRequests.filter(
      (id) => id !== friend_id
    );

    friend.sentRequests = friend.sentRequests.filter(
      (id) => id !== user.user_id
    );

    user.friends.push(friend.user_id);
    friend.friends.push(user.user_id);

    await user.save();
    await friend.save();

    if (user.friends) {
      const friends = await Promise.all(
        user.friends.map((id) => GeneralProfile.findOne({ user_id: id }))
      );

      res.status(200).json(friends);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const declineFriendRequest = async (req, res) => {
  try {
    const user_id = req.user._id;
    const friend_id = req.params.friendId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const friend = await GeneralProfile.findOne({ user_id: friend_id });

    user.receivedRequests = user.receivedRequests.filter(
      (id) => id !== friend_id
    );
    friend.sentRequests = friend.sentRequests.filter(
      (id) => id !== user.user_id
    );

    await user.save();
    await friend.save();

    if (user.receivedRequests) {
      const receivedRequests = await Promise.all(
        user.receivedRequests.map((id) =>
          GeneralProfile.findOne({ user_id: id })
        )
      );

      res.status(200).json(receivedRequests);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const unfriendFriend = async (req, res) => {
  try {
    const user_id = req.user._id;
    const friend_id = req.params.friendId;

    const user = await GeneralProfile.findOne({ user_id: user_id });
    const friend = await GeneralProfile.findOne({ user_id: friend_id });

    user.friends = user.friends.filter((id) => id !== friend_id);
    friend.friends = friend.friends.filter((id) => id !== user.user_id);

    await user.save();
    await friend.save();

    if (user.friends) {
      const friends = await Promise.all(
        user.friends.map((id) => GeneralProfile.findOne({ user_id: id }))
      );

      res.status(200).json(friends);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllGeneralProfiles = async (req, res) => {
  try {
    const profiles = await GeneralProfile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGeneralProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    profileImagePath,
    friends,
    followers,
    sentRequests,
    receivedRequests,
    enrolledCourses,
    contactNo,
    email,
    sex,
    city,
    country,
    bio,
    schoolsAttended,
    universityAttendedName,
    universityAttendedYear,
    universityAttendedDegree,
    currentEmploymentCompany,
    currentEmploymentPosition,
    currentEmploymentIndustry,
    previousExperiences,
    skills,
    achievements,
    twitterHandle,
    linkedinHandle,
  } = req.body;

  console.log("gen body", firstName);

  try {
    const user_id = req.user._id;

    // const achievementsFormatted = JSON.parse(achievements);
    // const schoolsAttendedFormatted = JSON.parse(schoolsAttended);
    // const skillsFormatted = JSON.parse(skills);
    // const previousExperiencesFormatted = JSON.parse(previousExperiences);

    console.log("comes here");

    const generalProfile = await GeneralProfile.create({
      firstName,
      lastName,
      dateOfBirth,
      profileImagePath,
      friends,
      followers,
      sentRequests,
      receivedRequests,
      enrolledCourses,
      contactNo,
      email,
      sex,
      city,
      country,
      bio,
      schoolsAttended,
      universityAttendedName,
      universityAttendedYear,
      universityAttendedDegree,
      currentEmploymentCompany,
      currentEmploymentPosition,
      currentEmploymentIndustry,
      previousExperiences,
      skills,
      achievements,
      twitterHandle,
      linkedinHandle,
      user_id,
    });
    res.status(200).json(generalProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateGeneralProfile = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    profileImagePath,
    contactNo,
    email,
    sex,
    city,
    country,
    bio,
    schoolsAttended,
    universityAttendedName,
    universityAttendedYear,
    universityAttendedDegree,
    currentEmploymentCompany,
    currentEmploymentPosition,
    currentEmploymentIndustry,
    previousExperiences,
    skills,
    twitterHandle,
    linkedinHandle,
  } = req.body;

  console.log("gen body", firstName);

  try {
    const user_id = req.user._id;

    // const achievementsFormatted = JSON.parse(achievements);
    // const schoolsAttendedFormatted = JSON.parse(schoolsAttended);
    // const skillsFormatted = JSON.parse(skills);
    // const previousExperiencesFormatted = JSON.parse(previousExperiences);

    console.log("comes here");

    const generalProfile = await GeneralProfile.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dateOfBirth,
        profileImagePath,
        contactNo,
        email,
        sex,
        city,
        country,
        bio,
        schoolsAttended,
        universityAttendedName,
        universityAttendedYear,
        universityAttendedDegree,
        currentEmploymentCompany,
        currentEmploymentPosition,
        currentEmploymentIndustry,
        previousExperiences,
        skills,
        twitterHandle,
        linkedinHandle,
        user_id,
      },
      { new: true }
    );
    res.status(200).json(generalProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteGeneralProfile = async (req, res) => {
  try {
    const profile = await GeneralProfile.findOneAndDelete({});

    if (!profile) {
      return res.status(404).json({ error: "Profile not yet created!" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export the methods to be used from other places
module.exports = {
  getUserFriends,
  getUserFollowers,
  sendUnsendRequests,
  followUnfollowBusiness,
  getReceivedRequests,
  getSentRequests,
  acceptFriendRequest,
  declineFriendRequest,
  createGeneralProfile,
  getGeneralProfile,
  getAllGeneralProfiles,
  updateGeneralProfile,
  deleteGeneralProfile,
  unfriendFriend,
};
