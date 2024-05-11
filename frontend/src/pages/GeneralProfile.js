import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/GeneralFlexBetween";
import Navbar from "../components/Navbar";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
// import "../styles/sideMenu.css";

import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const GeneralProfile = () => {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user.user);

  const { palette } = useTheme();
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/general/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log("Profile", json);
        setProfile(json);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="view-consultant-profile">
        <div className="sub">
          {/* <div className="sidemenu">
            <Sidemenu />
          </div> */}
          <div className="consultant-profile">
            <Typography textAlign="center" fontSize="2rem">
              My Profile
            </Typography>
            <Box p="1rem 0"></Box>
            <FlexBetween>
              <Button
                onClick={() => navigate("/general/edit")}
                sx={{
                  margin: "auto",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": {
                    backgroundColor: palette.primary.main,
                  },
                }}
              >
                UPDATE
              </Button>
            </FlexBetween>

            <div className="profile--cover">
              {profile && (
                <>
                  <Box>
                    <Box
                      width="100%"
                      padding="2rem 6%"
                      display={isNonMobileScreens ? "flex" : "block"}
                      gap="0.5rem"
                      justifyContent="space-between"
                    >
                      <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
                        <WidgetWrapper>
                          <FlexBetween gap="0.5rem" pb="1.1rem">
                            <FlexBetween gap="1rem">
                              <UserImage image={profile.profileImagePath} />
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
                                  {profile.firstName} {profile.lastName}
                                </Typography>
                              </Box>
                            </FlexBetween>
                          </FlexBetween>

                          <Divider />

                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Personal Details
                            </Typography>

                            <FlexBetween gap="1rem" mb="0.5rem">
                              <FlexBetween gap="1rem">
                                <Box>
                                  <Typography color={main} fontWeight="500">
                                    Email
                                  </Typography>
                                  <Typography color={medium}>
                                    {profile.email}
                                  </Typography>
                                </Box>
                              </FlexBetween>
                            </FlexBetween>

                            <FlexBetween gap="1rem" mb="0.5rem">
                              <FlexBetween gap="1rem">
                                <Box>
                                  <Typography color={main} fontWeight="500">
                                    Contact No
                                  </Typography>
                                  <Typography color={medium}>
                                    {profile.contactNo}
                                  </Typography>
                                </Box>
                              </FlexBetween>
                            </FlexBetween>

                            <FlexBetween gap="1rem" mb="0.5rem">
                              <FlexBetween gap="1rem">
                                <Box>
                                  <Typography color={main} fontWeight="500">
                                    Location
                                  </Typography>
                                  <Typography color={medium}>
                                    {profile.city}
                                  </Typography>
                                </Box>
                              </FlexBetween>
                            </FlexBetween>

                            <FlexBetween gap="1rem" mb="0.5rem">
                              <FlexBetween gap="1rem">
                                <Box>
                                  <Typography color={main} fontWeight="500">
                                    Bio
                                  </Typography>
                                  <Typography color={medium}>
                                    {profile.bio}
                                  </Typography>
                                </Box>
                              </FlexBetween>
                            </FlexBetween>
                          </Box>
                        </WidgetWrapper>
                        <Box p="1rem 0"></Box>
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Skills
                            </Typography>

                            {profile.skills &&
                              profile.skills.map((skill) => (
                                <>
                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          {skill.name}
                                        </Typography>
                                        <Typography color={medium}>
                                          {skill.level}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>
                                  <Box p="0.5rem 0"></Box>
                                  <Divider />
                                  <Box p="0.5rem 0"></Box>
                                </>
                              ))}
                          </Box>
                        </WidgetWrapper>
                      </Box>
                      <Box
                        flexBasis={isNonMobileScreens ? "70%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                      >
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Schools Attended
                            </Typography>

                            {profile.schoolsAttended &&
                              profile.schoolsAttended.map((school) => (
                                <>
                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          School Name
                                        </Typography>
                                        <Typography color={medium}>
                                          {school.schoolName}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>

                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          Year
                                        </Typography>
                                        <Typography color={medium}>
                                          {school.year}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>
                                  <Box p="0.5rem 0"></Box>
                                  <Divider />
                                  <Box p="0.5rem 0"></Box>
                                </>
                              ))}
                          </Box>
                        </WidgetWrapper>
                        <Box p="1rem 0"></Box>
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              University Attended
                            </Typography>

                            {profile.universityAttendedName && (
                              <>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Univerisity Name
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.universityAttendedName}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Year
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.universityAttendedYear}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Degree
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.universityAttendedDegree}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                              </>
                            )}
                          </Box>
                        </WidgetWrapper>
                        <Box p="1rem 0"></Box>
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Current Employment
                            </Typography>

                            {profile.currentEmploymentCompany && (
                              <>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Company Name
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.currentEmploymentCompany}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Position
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.currentEmploymentPosition}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Industry
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.currentEmploymentIndustry}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>
                              </>
                            )}
                          </Box>
                        </WidgetWrapper>
                        <Box p="1rem 0"></Box>
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Work Experience
                            </Typography>

                            {profile.previousExperiences &&
                              profile.previousExperiences.map((work) => (
                                <>
                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          Position
                                        </Typography>
                                        <Typography color={medium}>
                                          {work.position}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>

                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          Company
                                        </Typography>
                                        <Typography color={medium}>
                                          {work.company}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>

                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          Year
                                        </Typography>
                                        <Typography color={medium}>
                                          {work.year}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>

                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          Industry
                                        </Typography>
                                        <Typography color={medium}>
                                          {work.industry}
                                        </Typography>
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>

                                  <Box p="0.5rem 0"></Box>
                                  <Divider />
                                  <Box p="0.5rem 0"></Box>
                                </>
                              ))}
                          </Box>
                        </WidgetWrapper>
                        <Box p="1rem 0"></Box>
                        <WidgetWrapper>
                          <Box p="1rem 0">
                            <Typography
                              fontSize="1rem"
                              color={main}
                              fontWeight="500"
                              mb="1rem"
                            >
                              Achievements
                            </Typography>

                            {profile.achievements &&
                              profile.achievements.map((achievement) => (
                                <>
                                  <FlexBetween gap="1rem" mb="0.5rem">
                                    <FlexBetween gap="1rem">
                                      <Box>
                                        <Typography
                                          color={main}
                                          fontWeight="500"
                                        >
                                          {achievement.achievementOne}
                                        </Typography>
                                        {/* <Typography color={medium}>
                                          {achievement.achievementsDescription}
                                        </Typography> */}
                                      </Box>
                                    </FlexBetween>
                                  </FlexBetween>
                                  {achievement.achievementTwo && (
                                    <FlexBetween gap="1rem" mb="0.5rem">
                                      <FlexBetween gap="1rem">
                                        <Box>
                                          <Typography
                                            color={main}
                                            fontWeight="500"
                                          >
                                            {achievement.achievementTwo}
                                          </Typography>
                                          {/* <Typography color={medium}>
                                          {achievement.achievementsDescription}
                                        </Typography> */}
                                        </Box>
                                      </FlexBetween>
                                    </FlexBetween>
                                  )}

                                  <Box p="0.5rem 0"></Box>
                                  <Divider />
                                  <Box p="0.5rem 0"></Box>
                                </>
                              ))}
                          </Box>
                        </WidgetWrapper>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralProfile;
