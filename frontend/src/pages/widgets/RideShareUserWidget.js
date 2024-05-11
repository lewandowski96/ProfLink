import React from "react";

import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import Rating from "@mui/material/Rating";

import FlexBetween from "../../components/GeneralFlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";

const RideShareUserWidget = () => {
  const [rideShareUser, setRideShareUser] = useState();
  const { palette } = useTheme();
  const { navigate } = useNavigate();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/rideSharing/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRideShareUser(data);
      }
    };

    getUser();
  }, [user]);

  if (!rideShareUser) {
    return null;
  }

  const {
    firstName,
    lastName,
    userImage,
    userType,
    vehicleType,
    vehicleModel,
    ridesGone,
    rating,
  } = rideShareUser;

  console.log("rideshareuser", rideShareUser);

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate("/general/profile")}
      >
        <FlexBetween gap="1rem">
          <UserImage image={userImage} />
          <Box>
            <Typography variant="h4" color={dark} fontWeight="500">
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{ridesGone} rides gone</Typography>
            <Typography color={medium}>{userType}</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Rating name="read-only" value={rating} readOnly />
      </Box>

      {/* <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{city}</Typography>
        </Box>
        {currentEmploymentPosition && currentEmploymentCompany && (
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>
              {currentEmploymentPosition} at {currentEmploymentCompany}
            </Typography>
          </Box>
        )}
      </Box> */}

      <Divider />

      {userType === "DRIVER" && (
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Vehicle Details
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <Box>
                <Typography color={main} fontWeight="500">
                  Type
                </Typography>
                <Typography color={medium}>{vehicleType}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <Box>
                <Typography color={main} fontWeight="500">
                  Model
                </Typography>
                <Typography color={medium}>{vehicleModel}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default RideShareUserWidget;
