import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import FlexBetween from "../components/GeneralFlexBetween";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRideSharePost,
  setRideSharePosts,
} from "../store/reducers/rideShare.slice";

import React from "react";
import Navbar from "../components/Navbar";
import RideShareMyAcceptedPostViewWidget from "./widgets/RideShareMyAcceptedPostViewWidget";
import RideShareMyPostViewWidget from "./widgets/RideShareMyPostViewWidget";
import RideShareMyTakenPostViewWidget from "./widgets/RideShareMyTakenPostViewWidget";
import RideSharePostPassengerWidget from "./widgets/RideSharePostPassengerWidget";
import RideShareUserWidget from "./widgets/RideShareUserWidget";
// import { useAuthContext } from "../../hooks/useAuthContext";

const MyCompletedRidesTaken = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.rideShare.rideSharePosts);
  const profile = useSelector((state) => state.rideShare.profileData);

  console.log("posts", posts);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [error, setError] = useState("");

  const getPosts = async () => {
    console.log("user token", user.token);

    const allPosts = await fetch(`/api/rideSharing/myTakenRides`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!allPosts.ok) {
      return null;
    }

    const posts = await allPosts.json();

    dispatch(setRideSharePosts(posts));
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <RideShareUserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <div>
            <>
              <Typography
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1rem", gridColumn: "span 8" }}
              >
                My Taken Rides
              </Typography>
              <Typography
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1rem", mt: "1rem", gridColumn: "span 8" }}
              ></Typography>
              {posts &&
                posts.map((post) => (
                  <RideShareMyTakenPostViewWidget
                    key={post._id}
                    postId={post._id}
                    postUserId={post.userId}
                    posterName={post.posterName}
                    posterImage={post.posterImage}
                    userImage={user.user.profileImagePath}
                    userName={user.user.firstName + " " + user.user.lastName}
                    title={post.title}
                    start={post.start}
                    destination={post.destination}
                    rideDate={post.rideDate}
                    vehicle={post.vehicle}
                    vehicleType={post.vehicleType}
                    peopleCount={post.peopleCount}
                    applied={post.applied}
                    appliedUsersList={post.appliedUsersList}
                    accepted={post.accepted}
                    acceptedUsersList={post.acceptedUsersList}
                  />
                ))}
            </>
          </div>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default MyCompletedRidesTaken;
