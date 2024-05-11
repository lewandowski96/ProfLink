import React from "react";

import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Divider, Typography, useTheme } from "@mui/material";

import FlexBetween from "../../components/GeneralFlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";

const UserWidget = () => {
  const [generalUser, setGeneralUser] = useState();
  const { palette } = useTheme();
  const { navigate } = useNavigate();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/users/general", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });

      const data = await response.json();

      // if (!response.ok) {
      //   setGeneralUser([]);
      // }

      if (response.ok) {
        setGeneralUser(data);
      }
    };

    getUser();
  }, [user]);

  if (!generalUser) {
    return null;
  }

  const {
    firstName,
    lastName,
    city,
    profileImagePath,
    currentEmploymentCompany,
    currentEmploymentPosition,
    friends,
  } = generalUser;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate("/general/profile")}
      >
        <FlexBetween gap="1rem">
          <UserImage image={profileImagePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
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
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>
                {generalUser.twitterHandle || "Social Network"}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>
                {generalUser.linkedinHandle || "Network Platform"}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
