import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RideShareRegisterForm from "../components/RideShareRegisterForm";
import WidgetWrapper from "../components/WidgetWrapper";
import { setRideShareProfileData } from "../store/reducers/rideShare.slice";
import RideSharePostCreateWidget from "./widgets/RideSharePostCreateWidget";
import RideShareUserWidget from "./widgets/RideShareUserWidget";
import UserWidget from "./widgets/UserWidget";

const RideShare = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.rideShare.profileData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user, "dasdasdasdas");

  useEffect(() => {
    const getRideShareProfileData = async () => {
      const response = await fetch("/api/rideSharing/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      console.log("ride share profile res", json);

      if (response.ok) {
        dispatch(setRideShareProfileData({ profileData: json }));
      }
    };

    if (user) {
      getRideShareProfileData();
    }
  }, [user]);

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

          {profile.userType === "DRIVER" && (
            <>
              <Box p="1rem 0"></Box>
              <WidgetWrapper>
                <Button onClick={() => navigate("/rideSharing/myPosts")}>
                  <Typography
                    fullWidth
                    fontWeight="500"
                    variant="h5"
                    sx={{
                      mb: "1rem",
                      gridColumn: "span 8",
                      textAlign: "center",
                    }}
                  >
                    My Posts
                  </Typography>
                </Button>
              </WidgetWrapper>
              <Box p="1rem 0"></Box>
              <WidgetWrapper>
                <Button
                  onClick={() => navigate("/rideSharing/myCompletedRidesGone")}
                >
                  <Typography
                    fullWidth
                    fontWeight="500"
                    variant="h5"
                    sx={{
                      mb: "1rem",
                      gridColumn: "span 8",
                      textAlign: "center",
                    }}
                  >
                    My Rides Gone
                  </Typography>
                </Button>
              </WidgetWrapper>
            </>
          )}
          <Box p="1rem 0"></Box>
          <WidgetWrapper>
            <Button onClick={() => navigate("/rideSharing/myAcceptedPosts")}>
              <Typography
                fullWidth
                fontWeight="500"
                variant="h5"
                sx={{
                  mb: "1rem",
                  gridColumn: "span 8",
                  textAlign: "center",
                }}
              >
                Accepted Posts
              </Typography>
            </Button>
          </WidgetWrapper>
          <Box p="1rem 0"></Box>
          <WidgetWrapper>
            <Button
              onClick={() => navigate("/rideSharing/myCompletedRidesTaken")}
            >
              <Typography
                fullWidth
                fontWeight="500"
                variant="h5"
                sx={{
                  mb: "1rem",
                  gridColumn: "span 8",
                  textAlign: "center",
                }}
              >
                My Rides Taken
              </Typography>
            </Button>
          </WidgetWrapper>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {user.user.rideSharingProfileCreated &&
          profile.approvalStatus === "APPROVED" ? (
            <RideSharePostCreateWidget
              profileImagePath={user.user.profileImagePath}
            />
          ) : user.user.rideSharingProfileCreated &&
            profile.approvalStatus === "PENDING" ? (
            <WidgetWrapper>
              <Typography
                fullWidth
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1rem", gridColumn: "span 8", textAlign: "center" }}
              >
                Please be patient. Your application is under review!
              </Typography>
            </WidgetWrapper>
          ) : (
            <RideShareRegisterForm />
          )}
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default RideShare;
