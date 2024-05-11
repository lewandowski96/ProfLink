import { Field, FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Navbar";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TextField as TextFieldFormik } from "formik-material-ui";
import FlexBetween from "./GeneralFlexBetween";

import Dropzone from "react-dropzone";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useFirebaseStorage from "../hooks/useFirebaseStorage";
import { setUser } from "../store/reducers/auth.slice";

const GeneralProfileEditForm = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [achievementOneMediaUrl, setAchievementOneMediaUrl] = useState("");
  const [achievementTwoMediaUrl, setAchievementTwoMediaUrl] = useState("");

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedAchievementOneFile, setSelectedAchievementOneFile] =
    useState("");
  const [selectedAchievementTwoFile, setSelectedAchievementTwoFile] =
    useState("");

  const { startUpload } = useFirebaseStorage(setError, setProfileImageUrl);
  // const { startUpload as  } = useFirebaseStorage(
  //   setError,
  //   setAchievementOneMediaUrl
  // );
  // const { startAchievementTwoUpload } = useFirebaseStorage(
  //   setError,
  //   setAchievementTwoMediaUrl
  // );

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);

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
  }, []);

  const initialValuesLogin = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    profileImagePath: profileImageUrl,
    dateOfBirth: profile?.dateOfBirth,
    contactNo: profile?.contactNo,
    email: profile?.email,
    sex: profile?.sex,
    city: profile?.city,
    country: "SRI LANKA",
    bio: profile?.bio,
    schoolsAttended: profile?.schoolsAttended,
    universityAttendedName: profile?.universityAttendedName,
    universityAttendedYear: profile?.universityAttendedYear,
    universityAttendedDegree: profile?.universityAttendedDegree,
    currentEmploymentCompany: profile?.currentEmploymentCompany,
    currentEmploymentPosition: profile?.currentEmploymentPosition,
    currentEmploymentIndustry: profile?.currentEmploymentIndustry,
    previousExperiences: profile?.previousExperiences,
    skills: profile?.skills,
    achievementOne: profile?.achievementOne,
    achievementOneMedia: achievementOneMediaUrl,
    achievementTwo: profile?.achievementTwo,
    achievementTwoMedia: achievementTwoMediaUrl,
    twitterHandle: profile?.twitterHandle,
    linkedInHandle: profile?.linkedInHandle,
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("required").min(3),
    lastName: yup.string().required("required").min(3),
    profileImagePath: yup.string(),
    dateOfBirth: yup.date().required("required"),
    contactNo: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    sex: yup.string().required("required"),
    city: yup.string().required("required"),
    bio: yup.string().required("required"),
    schoolsAttended: yup
      .array(
        yup.object({
          schoolName: yup.string().required("required"),
          year: yup
            .number()
            .required("required")
            .min(1900, "minimum year is 1900")
            .max(2012, "maximum year is 2012"),
        })
      )
      .min(1)
      .max(3),
    universityAttendedName: yup.string(),
    universityAttendedYear: yup
      .number()
      .min(1900, "minimum year is 1900")
      .max(2012, "maximum year is 2012"),
    universityAttendedDegree: yup.string(),
    currentEmploymentCompany: yup.string(),
    currentEmploymentPosition: yup.string(),
    currentEmploymentIndustry: yup.string(),
    previousExperiences: yup
      .array(
        yup.object({
          company: yup.string(),
          position: yup.string(),
          year: yup
            .number()
            .min(1900, "minimum year is 1900")
            .max(2012, "maximum year is 2012"),
          industry: yup.string(),
        })
      )
      .min(1)
      .max(3),
    skills: yup
      .array(
        yup.object({
          name: yup.string(),
          level: yup.string(),
        })
      )
      .min(1)
      .max(3),
    achievementOne: yup.string(),
    achievementOneMedia: yup.string(),
    achievementTwo: yup.string(),
    achievementTwoMedia: yup.string(),
    twitterHandle: yup.string(),
    linkedInHandle: yup.string(),
    rideSharingProfileCreated: yup.boolean(),
  });

  const arrangeFormData = async (values, onSubmitProps) => {
    const formData = {
      id: profile?._id,
      firstName: values["firstName"],
      lastName: values["lastName"],
      profileImagePath: profileImageUrl,
      dateOfBirth: values["dateOfBirth"],
      contactNo: values["contactNo"],
      email: values["email"],
      sex: values["sex"],
      city: values["city"],
      country: "SRI LANKA",
      bio: values["bio"],
      schoolsAttended: values["schoolsAttended"],
      universityAttendedName: values["universityAttendedName"],
      universityAttendedYear: values["universityAttendedYear"],
      universityAttendedDegree: values["universityAttendedDegree"],
      currentEmploymentCompany: values["currentEmploymentCompany"],
      currentEmploymentPosition: values["currentEmploymentPosition"],
      currentEmploymentIndustry: values["currentEmploymentIndustry"],
      previousExperiences: values["previousExperiences"],
      skills: values["skills"],
      achievements: profile?.achievements,
      twitterHandle: values["twitterHandle"],
      linkedinHandle: values["linkedinHandle"],
      rideSharingProfileCreated: profile?.rideSharingProfileCreated,
    };

    console.log("post data ", formData);

    const response = await fetch("/api/profiles/general", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch(setUser(response.json));
      navigate("/");
    }
  };

  const handleImageFileChange = (file) => {
    if (file) {
      setSelectedFile(file);

      console.log("fileee", file);

      startUpload(file, setProfileImageUrl);
      const selectedImageFile = new FileReader();

      selectedImageFile.readAsDataURL(file);
    }
  };

  const handleAchievementOneFileChange = (file) => {
    if (file) {
      setSelectedAchievementOneFile(file);

      console.log("fileee", file);

      startUpload(file, setAchievementOneMediaUrl);
      const selectedImageFile = new FileReader();

      selectedImageFile.readAsDataURL(file);
    }
  };

  const handleAchievementTwoFileChange = (file) => {
    if (file) {
      setSelectedAchievementTwoFile(file);

      console.log("fileee", file);

      startUpload(file, setAchievementTwoMediaUrl);
      const selectedImageFile = new FileReader();

      selectedImageFile.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await arrangeFormData(values, onSubmitProps);
  };
  return (
    <>
      <Navbar />
      <Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Formik
            enableReinitialize={true}
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 8",
                    },
                  }}
                >
                  <Typography
                    fontWeight="500"
                    variant="h5"
                    sx={{ mb: "1rem", gridColumn: "span 8" }}
                  >
                    Let's add your information!
                  </Typography>
                  {error && (
                    <Box
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{ gridColumn: "span 8", input: { color: "red" } }}
                    >
                      <Typography color="red">{error}</Typography>
                    </Box>
                  )}
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <Box gridColumn="span 8">
                    <Dropzone
                      accept=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={
                        (acceptedFiles) =>
                          handleImageFileChange(acceptedFiles[0])
                        // setFieldValue("profileImage", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!selectedFile.name ? (
                            <p>Add Profile Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{selectedFile.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>

                  <TextField
                    label="Date Of Birth"
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateOfBirth}
                    name="dateOfBirth"
                    error={
                      Boolean(touched.dateOfBirth) &&
                      Boolean(errors.dateOfBirth)
                    }
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                    sx={{ gridColumn: "span 8" }}
                  />
                  <TextField
                    label="Contact Number"
                    type="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactNo}
                    name="contactNo"
                    error={
                      Boolean(touched.contactNo) && Boolean(errors.contactNo)
                    }
                    helperText={touched.contactNo && errors.contactNo}
                    sx={{ gridColumn: "span 8" }}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 8" }}
                  />
                  <TextField
                    select
                    label="Sex"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sex}
                    name="sex"
                    error={Boolean(touched.sex) && Boolean(errors.sex)}
                    helperText={touched.sex && errors.sex}
                    sx={{ gridColumn: "span 8" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"MALE"}>Male</MenuItem>
                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name="city"
                    error={Boolean(touched.city) && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    sx={{ gridColumn: "span 8" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"COLOMBO"}>Colombo</MenuItem>
                    <MenuItem value={"GALLE"}>Galle</MenuItem>
                    <MenuItem value={"MATARA"}>Matara</MenuItem>
                  </TextField>

                  {/* <FieldArray name="schoolsAttended">
                    {({ push, remove }) => (
                      <>
                        <Typography sx={{ gridColumn: "span 8" }}>
                          Schools Attended
                        </Typography>

                        {values.schoolsAttended.map((_, index) => (
                          <>
                            <Box sx={{ gridColumn: "span 4" }}>
                              <Field
                                fullWidth
                                name={`schoolsAttended[${index}].schoolName`}
                                component={TextFieldFormik}
                                label="School Name"
                              />
                            </Box>

                            <Box sx={{ gridColumn: "span 2" }}>
                              <Field
                                name={`schoolsAttended[${index}].year`}
                                component={TextFieldFormik}
                                label="Year"
                              />
                            </Box>

                            <Button
                              onClick={() => remove(index)}
                              sx={{
                                height: "1.5rem",
                                m: "1rem 0",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                  backgroundColor: palette.primary.main,
                                },
                                gridColumn: "span 2",
                              }}
                            >
                              Remove
                            </Button>
                          </>
                        ))}
                        <Button
                          onClick={() => push({ schoolName: "", year: "" })}
                          sx={{
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {
                              backgroundColor: palette.primary.main,
                            },
                          }}
                        >
                          Add
                        </Button>
                      </>
                    )}
                  </FieldArray> */}

                  <TextField
                    label="Bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    error={Boolean(touched.bio) && Boolean(errors.bio)}
                    helperText={touched.bio && errors.bio}
                    sx={{ gridColumn: "span 8" }}
                  />

                  <Typography sx={{ gridColumn: "span 8" }}>
                    University Attended
                  </Typography>

                  <TextField
                    label="University Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.universityAttendedName}
                    name="universityAttendedName"
                    error={
                      Boolean(touched.universityAttendedName) &&
                      Boolean(errors.universityAttendedName)
                    }
                    helperText={
                      touched.universityAttendedName &&
                      errors.universityAttendedName
                    }
                    sx={{ gridColumn: "span 8" }}
                  />

                  <TextField
                    label="Graduated Year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.universityAttendedYear}
                    name="universityAttendedYear"
                    error={
                      Boolean(touched.universityAttendedYear) &&
                      Boolean(errors.universityAttendedYear)
                    }
                    helperText={
                      touched.universityAttendedYear &&
                      errors.universityAttendedYear
                    }
                    sx={{ gridColumn: "span 8" }}
                  />

                  <TextField
                    label="Degree"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.universityAttendedDegree}
                    name="universityAttendedDegree"
                    error={
                      Boolean(touched.universityAttendedDegree) &&
                      Boolean(errors.universityAttendedDegree)
                    }
                    helperText={
                      touched.universityAttendedDegree &&
                      errors.universityAttendedDegree
                    }
                    sx={{ gridColumn: "span 8" }}
                  />

                  <Typography sx={{ gridColumn: "span 8" }}>
                    Current Employment
                  </Typography>

                  <TextField
                    label="Company Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentEmploymentCompany}
                    name="currentEmploymentCompany"
                    error={
                      Boolean(touched.currentEmploymentCompany) &&
                      Boolean(errors.currentEmploymentCompany)
                    }
                    helperText={
                      touched.currentEmploymentCompany &&
                      errors.currentEmploymentCompany
                    }
                    sx={{ gridColumn: "span 8" }}
                  />

                  <TextField
                    label="Position"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentEmploymentPosition}
                    name="currentEmploymentPosition"
                    error={
                      Boolean(touched.currentEmploymentPosition) &&
                      Boolean(errors.currentEmploymentPosition)
                    }
                    helperText={
                      touched.currentEmploymentPosition &&
                      errors.currentEmploymentPosition
                    }
                    sx={{ gridColumn: "span 8" }}
                  />

                  <TextField
                    select
                    label="Industry"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentEmploymentIndustry}
                    name="currentEmploymentIndustry"
                    error={
                      Boolean(touched.currentEmploymentIndustry) &&
                      Boolean(errors.currentEmploymentIndustry)
                    }
                    helperText={
                      touched.currentEmploymentIndustry &&
                      errors.currentEmploymentIndustry
                    }
                    sx={{ gridColumn: "span 8" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"IT"}>Information Technology</MenuItem>
                    <MenuItem value={"BUSINESS"}>Business</MenuItem>
                    <MenuItem value={"CONSTRUCTION"}>Construction</MenuItem>
                  </TextField>

                  {/* <FieldArray name="previousExperiences">
                    {({ push, remove }) => (
                      <>
                        <Typography sx={{ gridColumn: "span 8" }}>
                          Previous Experiences
                        </Typography>

                        {values.previousExperiences.map((_, index) => (
                          <>
                            <Box sx={{ gridColumn: "span 8" }}>
                              <Field
                                fullWidth
                                name={`previousExperiences[${index}].company`}
                                component={TextFieldFormik}
                                label="Company Name"
                              />
                            </Box>

                            <Box sx={{ gridColumn: "span 6" }}>
                              <Field
                                fullWidth
                                name={`previousExperiences[${index}].position`}
                                component={TextFieldFormik}
                                label="Position"
                              />
                            </Box>

                            <Box sx={{ gridColumn: "span 2" }}>
                              <Field
                                fullWidth
                                name={`previousExperiences[${index}].year`}
                                component={TextFieldFormik}
                                label="Joined Year"
                              />
                            </Box>

                            <Box sx={{ gridColumn: "span 8" }}>
                              <Field
                                fullWidth
                                name={`previousExperiences[${index}].industry`}
                                component={TextFieldFormik}
                                label="Industry"
                              />
                            </Box>

                            <Button
                              onClick={() => remove(index)}
                              sx={{
                                height: "1.5rem",
                                m: "1rem 0",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                  backgroundColor: palette.primary.main,
                                },
                                gridColumn: "span 8",
                              }}
                            >
                              Remove
                            </Button>
                          </>
                        ))}
                        <Button
                          onClick={() =>
                            push({ positon: "", year: "", industry: "" })
                          }
                          sx={{
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {
                              backgroundColor: palette.primary.main,
                            },
                          }}
                        >
                          Add
                        </Button>
                      </>
                    )}
                  </FieldArray> */}

                  {/* <FieldArray name="skills">
                    {({ push, remove }) => (
                      <>
                        <Typography sx={{ gridColumn: "span 8" }}>
                          Add Your Skills
                        </Typography>

                        {values.skills.map((_, index) => (
                          <>
                            <Box sx={{ gridColumn: "span 3" }}>
                              <Field
                                fullWidth
                                name={`skills[${index}].name`}
                                component={TextFieldFormik}
                                label="Skill Name"
                                helperText="Java, PHP, Python etc"
                              />
                            </Box>

                            <Box sx={{ gridColumn: "span 3" }}>
                              <Field
                                fullWidth
                                select
                                name={`skills[${index}].level`}
                                component={TextFieldFormik}
                                label="Skill Level"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={"LOW"}>Low</MenuItem>
                                <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                                <MenuItem value={"HIGH"}>High</MenuItem>
                              </Field>
                            </Box>

                            <Button
                              onClick={() => remove(index)}
                              sx={{
                                height: "1.5rem",
                                m: "1rem 0",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                  backgroundColor: palette.primary.main,
                                },
                                gridColumn: "span 2",
                              }}
                            >
                              Remove
                            </Button>
                          </>
                        ))}
                        <Button
                          onClick={() => push({ name: "", level: "" })}
                          sx={{
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {
                              backgroundColor: palette.primary.main,
                            },
                          }}
                        >
                          Add
                        </Button>
                      </>
                    )}
                  </FieldArray> */}

                  <Typography sx={{ gridColumn: "span 8" }}>
                    Add Your Socials
                  </Typography>
                  <TextField
                    label="Twitter Handle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.twitterHandle}
                    name="twitterHandle"
                    error={
                      Boolean(touched.twitterHandle) &&
                      Boolean(errors.twitterHandle)
                    }
                    helperText={touched.twitterHandle && errors.twitterHandle}
                    sx={{ gridColumn: "span 8" }}
                  />
                  <TextField
                    label="LinkedIn Link"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.linkedInHandle}
                    name="linkedInHandle"
                    error={
                      Boolean(touched.linkedInHandle) &&
                      Boolean(errors.linkedInHandle)
                    }
                    helperText={touched.linkedInHandle && errors.linkedInHandle}
                    sx={{ gridColumn: "span 8" }}
                  />
                </Box>

                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { backgroundColor: palette.primary.main },
                    }}
                  >
                    {isSubmitting ? "UPDATING YOUR PROFILE" : "UPDATE"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default GeneralProfileEditForm;
