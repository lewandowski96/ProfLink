import React, { useEffect, useState } from "react";
import userImage from "../assest/profimage2.jpeg";
import Sidemenu from "../components/Sidemenu";
// import { useAuthContext } from "../hooks/useAuthContext";
import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

const ConsultantProfile = () => {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);

  const { palette } = useTheme();
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/consultant/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log("Team Profile", json);
        setProfile(json);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleDelete = async () => {
    const response = await fetch(
      `/api/profiles/consultant/team/${profile._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="view-consultant-profile">
        <Typography textAlign="center" fontSize="2rem">
          Your Consultant Profile
        </Typography>
        <div className="sub">
          <div className="consultant-profile">
            <div className="profile--cover">
              {profile && (
                <div>
                  {profile.consultantType === "TEAM" && (
                    <>
                      <Box>
                        <Box
                          width="100%"
                          padding="2rem 6%"
                          display={isNonMobileScreens ? "flex" : "block"}
                          gap="0.5rem"
                          justifyContent="space-between"
                        >
                          <Box
                            flexBasis={isNonMobileScreens ? "25%" : undefined}
                          >
                            <WidgetWrapper>
                              <FlexBetween gap="0.5rem" pb="1.1rem">
                                <FlexBetween gap="1rem">
                                  <UserImage image={profile.teamImage} />
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
                                      {profile.fullName}
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
                                  Team Details
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
                                  Team Members
                                </Typography>

                                {profile.teamMembers &&
                                  profile.teamMembers.map((teamMember) => (
                                    <>
                                      <FlexBetween gap="1rem" mb="0.5rem">
                                        <FlexBetween gap="1rem">
                                          <Box>
                                            <Typography
                                              color={main}
                                              fontWeight="500"
                                            >
                                              {teamMember.memberName}
                                            </Typography>
                                            <Typography color={medium}>
                                              {teamMember.memberEmail}
                                            </Typography>
                                            <Typography color={medium}>
                                              {teamMember.memberContactNo}
                                            </Typography>
                                          </Box>
                                        </FlexBetween>
                                      </FlexBetween>
                                      <Box p="0.5rem 0"></Box>
                                      <Divider />
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
                                  Projects
                                </Typography>

                                {profile.projects &&
                                  profile.projects.map((project) => (
                                    <>
                                      <FlexBetween gap="1rem" mb="0.5rem">
                                        <FlexBetween gap="1rem">
                                          <Box>
                                            <Typography
                                              color={main}
                                              fontWeight="500"
                                            >
                                              Project Name
                                            </Typography>
                                            <Typography color={medium}>
                                              {project.projectName}
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
                                              Project Description
                                            </Typography>
                                            <Typography color={medium}>
                                              {project.projectDescription}
                                            </Typography>
                                          </Box>
                                        </FlexBetween>
                                      </FlexBetween>

                                      <Box p="0.5rem 0"></Box>
                                      <Divider />
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
                                  Expertise
                                </Typography>

                                {profile.expertise &&
                                  profile.expertise.map((exp) => (
                                    <>
                                      <FlexBetween gap="1rem" mb="0.5rem">
                                        <FlexBetween gap="1rem">
                                          <Box>
                                            <Typography
                                              color={main}
                                              fontWeight="500"
                                            >
                                              Sector
                                            </Typography>
                                            <Typography color={medium}>
                                              {exp.expertiseField}
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
                                              Brief Description
                                            </Typography>
                                            <Typography color={medium}>
                                              {exp.describeExpertise}
                                            </Typography>
                                          </Box>
                                        </FlexBetween>
                                      </FlexBetween>
                                      <Box p="0.5rem 0"></Box>
                                      <Divider />
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
                                              {achievement.achievementsName}
                                            </Typography>
                                            <Typography color={medium}>
                                              {
                                                achievement.achievementsDescription
                                              }
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
                        </Box>
                        <Box p="1rem 0">
                          <FlexBetween>
                            <Button
                              onClick={() => navigate("/consultant/edit")}
                              sx={{
                                display: "flex",
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
                        </Box>
                        <Box p="1rem 0">
                          <FlexBetween>
                            <Button
                              onClick={handleDelete}
                              sx={{
                                display: "flex",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                  backgroundColor: palette.primary.main,
                                },
                              }}
                            >
                              DELETE
                            </Button>
                          </FlexBetween>
                        </Box>
                        <Box p="1rem 0">
                          <FlexBetween>
                            <Button
                              onClick={() => navigate("/consultant/createad")}
                              sx={{
                                display: "flex",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                  backgroundColor: palette.primary.main,
                                },
                              }}
                            >
                              Advertisements
                            </Button>
                          </FlexBetween>
                        </Box>
                      </Box>
                    </>
                  )}
                  {profile.consultantType === "INDIVIDUAL" && (
                    <>
                      <Box>
                        <Box
                          width="100%"
                          padding="2rem 6%"
                          display={isNonMobileScreens ? "flex" : "block"}
                          gap="0.5rem"
                          justifyContent="space-between"
                        >
                          <Box
                            flexBasis={isNonMobileScreens ? "25%" : undefined}
                          >
                            <WidgetWrapper>
                              <FlexBetween gap="0.5rem" pb="1.1rem">
                                <FlexBetween gap="1rem">
                                  <UserImage image={profile.userImage} />
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
                                      {profile.fullName}
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
                                        {profile.yourLocation}
                                      </Typography>
                                    </Box>
                                  </FlexBetween>
                                </FlexBetween>

                                <FlexBetween gap="1rem" mb="0.5rem">
                                  <FlexBetween gap="1rem">
                                    <Box>
                                      <Typography color={main} fontWeight="500">
                                        Yourself
                                      </Typography>
                                      <Typography color={medium}>
                                        {profile.yourSelf}
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
                                              {skill.AddSkills}
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
                                  Schools / University Attended
                                </Typography>

                                {profile.schoolsUniversityAttended &&
                                  profile.schoolsUniversityAttended.map(
                                    (school) => (
                                      <>
                                        <FlexBetween gap="1rem" mb="0.5rem">
                                          <FlexBetween gap="1rem">
                                            <Box>
                                              <Typography
                                                color={main}
                                                fontWeight="500"
                                              >
                                                University Name
                                              </Typography>
                                              <Typography color={medium}>
                                                {school.universityName}
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

                                        <FlexBetween gap="1rem" mb="0.5rem">
                                          <FlexBetween gap="1rem">
                                            <Box>
                                              <Typography
                                                color={main}
                                                fontWeight="500"
                                              >
                                                Degree
                                              </Typography>
                                              <Typography color={medium}>
                                                {school.degree}
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
                                                Field of Study
                                              </Typography>
                                              <Typography color={medium}>
                                                {school.fieldOfStudy}
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
                                                Description
                                              </Typography>
                                              <Typography color={medium}>
                                                {school.description}
                                              </Typography>
                                            </Box>
                                          </FlexBetween>
                                        </FlexBetween>
                                        <Box p="0.5rem 0"></Box>
                                        <Divider />
                                        <Box p="0.5rem 0"></Box>
                                      </>
                                    )
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

                                {profile.workExperience &&
                                  profile.workExperience.map((work) => (
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
                                              {work.nameOfPosition}
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
                                              {work.companyName}
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
                                              Start Date
                                            </Typography>
                                            <Typography color={medium}>
                                              {work.startDate}
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
                                              End Date
                                            </Typography>
                                            <Typography color={medium}>
                                              {work.endDate}
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
                                              {work.industryName}
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
                                              {achievement.achievementsName}
                                            </Typography>
                                            <Typography color={medium}>
                                              {
                                                achievement.achievementsDescription
                                              }
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
                                  Projects
                                </Typography>

                                {profile.projects &&
                                  profile.projects.map((project) => (
                                    <>
                                      <FlexBetween gap="1rem" mb="0.5rem">
                                        <FlexBetween gap="1rem">
                                          <Box>
                                            <Typography
                                              color={main}
                                              fontWeight="500"
                                            >
                                              Project Name
                                            </Typography>
                                            <Typography color={medium}>
                                              {project.projectName}
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
                                              Project Description
                                            </Typography>
                                            <Typography color={medium}>
                                              {project.projectDescription}
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
                        </Box>
                      </Box>

                      {/* <div className="profile--item">
                        <p>Schools University Attended</p>
                        {profile.schoolsUniversityAttended &&
                          profile.schoolsUniversityAttended.map((school) => (
                            <>
                              <p>{school.universityName}</p>
                              <p>{school.year}</p>
                              <p>{school.degree}</p>
                            </>
                          ))}
                      </div> */}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultantProfile;
