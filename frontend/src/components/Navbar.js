import React, { useEffect, useState } from "react";
import {
  BiSearchAlt2,
  BiSolidBell,
  BiSolidBox,
  BiSolidCompass,
  BiSolidHome,
  BiSolidLocationPlus,
  BiSolidMessageAltDetail,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import user1 from "../assest/user.jpeg";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Business,
  Close,
  Help,
  LocalTaxi,
  Menu,
  Message,
  Notifications,
  Search,
  Work,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../store/reducers/auth.slice";
import FlexBetween from "./GeneralFlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const user = useSelector((state) => state.user.user);

  const theme = useTheme();

  console.log(theme.palette);

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const [open, setOpen] = useState(false);

  // const Menu = [];
  const { logout } = useLogout();
  // const { user } = useAuthContext();
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileCreateUrl, setProfileCreateUrl] = useState("");
  const [profileViewUrl, setProfileViewUrl] = useState("");

  let name = "";

  if (user) {
    if (user.user) {
      if (user.userType === "GENERAL") {
        name = `${user.user.firstName}`;
      } else if (user.userType === "BUSINESS") {
        name = `${user.user.name}`;
      } else if (user.userType === "COMPANY") {
        name = `${user.user.name}`;
      } else {
        name = `${user.user.fullName}`;
      }
    }
  }

  const handleLogout = () => {
    setIsProfileCreated(false);
    logout();
  };

  useEffect(() => {
    const checkProfiles = async () => {
      let url = "";

      console.log(user);

      if (user.userType === "GENERAL") {
        url = "/api/profiles/general";
        setProfileCreateUrl("/general/create");
        setProfileViewUrl("/general/profile");
      } else if (user.userType === "BUSINESS") {
        url = "/api/profiles/business";
        setProfileCreateUrl("/business/create");
        setProfileViewUrl("/business/profile");
      } else if (user.userType === "COMPANY") {
        url = "/api/profiles/company";
        setProfileCreateUrl("/company/create");
        setProfileViewUrl("/company/profile");
      } else if (user.userType === "CONSULTANT") {
        url = "/api/profiles/consultant";
        setProfileCreateUrl("/consultant/create");
        setProfileViewUrl("/consultant/profile");
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      console.log("profile res", json);

      if (response.ok) {
        setIsProfileCreated(true);
      }
    };

    if (user) {
      checkProfiles();
    }
  }, [user]);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Link to="/">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/")}
          >
            ProfLink
          </Typography>
        </Link>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search ..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <Business
            sx={{ fontSize: "25px" }}
            onClick={() => navigate("/business/list")}
          />
          <Work
            sx={{ fontSize: "25px" }}
            onClick={() => navigate("/companies")}
          />
          {user.userType === "GENERAL" && (
            <LocalTaxi
              sx={{ fontSize: "25px" }}
              onClick={() => navigate("/rideSharing")}
            />
          )}
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={name}>
            <Select
              value={name}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem
                value={name}
                onClick={() =>
                  isProfileCreated
                    ? navigate(profileViewUrl)
                    : navigate(profileCreateUrl)
                }
              >
                <Typography>
                  {isProfileCreated ? "VIEW PROFILE" : "CREATE PROFILE"}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <Business sx={{ fontSize: "25px" }} />
            <Work
              sx={{ fontSize: "25px" }}
              onClick={() => navigate("/companies")}
            />
            {user.userType === "GENERAL" && (
              <LocalTaxi
                sx={{ fontSize: "25px" }}
                onClick={() => navigate("/rideSharing")}
              />
            )}
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={name}>
              <Select
                value={name}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={name}
                  onClick={() =>
                    isProfileCreated
                      ? navigate(profileViewUrl)
                      : navigate(profileCreateUrl)
                  }
                >
                  <Typography>
                    {isProfileCreated ? "VIEW PROFILE" : "CREATE PROFILE"}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
