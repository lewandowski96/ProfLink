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

import FlexBetween from "../../components/GeneralFlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRideSharePost,
  setRideSharePosts,
} from "../../store/reducers/rideShare.slice";

import React from "react";
import RideSharePostPassengerWidget from "./RideSharePostPassengerWidget";
// import { useAuthContext } from "../../hooks/useAuthContext";

const RideSharePostCreateWidget = () => {
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

    const allPosts = await fetch(`/api/rideSharing/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const posts = await allPosts.json();

    dispatch(setRideSharePosts(posts));
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePost = async () => {
    console.log("comes here");
    if (
      title.trim() === "" ||
      start.trim() === "" ||
      destination.trim() === "" ||
      rideDate.trim() === ""
    ) {
      setError("Please fill out all the fields");
      return;
    }

    const data = {
      userId: user.user.user_id,
      title,
      start,
      destination,
      rideDate,
    };

    const response = await fetch(`/api/rideSharing/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    const post = await response.json();

    console.log("ride share post save", post);

    dispatch(setRideSharePost({ rideSharePost: post }));
    setTitle("");
    setStart("");
    setDestination("");
    setRideDate(null);
  };

  return (
    <div>
      <>
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1rem", gridColumn: "span 8" }}
        >
          Ride Sharing Portal!
        </Typography>
        {profile.userType === "DRIVER" && (
          <WidgetWrapper>
            <FlexBetween gap="1.5rem">
              <UserImage image={user.user.profileImagePath} />
              <Typography sx={{ textAlign: "left" }}>Add new post</Typography>
            </FlexBetween>
            <Divider sx={{ margin: "1.25rem 0" }} />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            >
              {error && (
                <TextField
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={error}
                  sx={{ gridColumn: "span 4", input: { color: "red" } }}
                ></TextField>
              )}
              <TextField
                label="Title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                name="title"
                sx={{ gridColumn: "span 8" }}
              />
              <TextField
                label="Source"
                type="text"
                onChange={(e) => setStart(e.target.value)}
                value={start}
                name="start"
                sx={{ gridColumn: "span 8" }}
              />
              <TextField
                label="Destination"
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                name="destination"
                sx={{ gridColumn: "span 8" }}
              />
              <TextField
                label="Starting Data and Time"
                placeholder="Da"
                type="datetime-local"
                onChange={(e) => setRideDate(e.target.value)}
                value={rideDate}
                name="rideDate"
                sx={{ gridColumn: "span 8" }}
              />
            </Box>
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
              <Button
                onClick={handlePost}
                sx={{
                  color: palette.background.dark,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                <Typography
                  fontWeight="bold"
                  // fontSize="clamp(1rem, 2rem, 2.25rem)"
                  color="white"
                  sx={{ alignItems: "right" }}
                >
                  POST
                </Typography>
              </Button>
            </FlexBetween>
          </WidgetWrapper>
        )}

        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1rem", mt: "1rem", gridColumn: "span 8" }}
        ></Typography>
        {posts &&
          posts.map(
            (post) =>
              !(
                post.acceptedUsersList.length > 0 &&
                post.acceptedUsersList.includes(user.user.user_id)
              ) && (
                <RideSharePostPassengerWidget
                  key={post._id}
                  postId={post._id}
                  postUserId={post.userId}
                  posterName={post.posterName}
                  posterImage={post.posterImage}
                  title={post.title}
                  start={post.start}
                  destination={post.destination}
                  rideDate={post.rideDate}
                  vehicle={post.vehicle}
                  vehicleType={post.vehicleType}
                  peopleCount={post.peopleCount}
                  applied={post.applied}
                  appliedUsersList={post.appliedUsersList}
                />
              )
          )}
      </>
    </div>
  );
};

export default RideSharePostCreateWidget;
