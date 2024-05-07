import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import RideShareRegisterForm from "../components/RideShareRegisterForm";
import { setRideShareProfileData } from "../store/reducers/rideShare.slice";
import RideSharePostCreateWidget from "./widgets/RideSharePostCreateWidget";
import RideShareUserWidget from "./widgets/RideShareUserWidget";
import UserWidget from "./widgets/UserWidget";

const RideShare = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.rideShare.profileData);
  const dispatch = useDispatch();

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
            <p>Please wait. Your request is pending.</p>
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
