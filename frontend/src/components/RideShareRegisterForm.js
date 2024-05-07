import { Field, FieldArray, Formik } from "formik";
import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import { setUser } from "../store/reducers/auth.slice";

import Navbar from "./Navbar";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import WidgetWrapper from "./WidgetWrapper";

const RideShareRegisterForm = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = useSelector((state) => state.user.user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const [nationalIdImage, setNationalIdImage] = useState("");
  const [driversLicenceImage, setDriversLicenceImage] = useState("");

  const initialValues = {
    agreementCheck: false,
    nationalIdImageName: "",
    nationalIdImageBase64: "",
    userType: "",
    driversLicenceImageBase64: "",
    driversLicenceImageName: "",
    vehicleType: "",
    vehicleModel: "",
    noOfPassengers: "",
  };

  const validationSchema = yup.object().shape({
    agreementCheck: yup.boolean().required().isTrue(),
    nationalIdImageBase64: yup.string().required("Must upload the NIC"),
    userType: yup.string().required(),
    driversLicenceImageBase64: yup
      .string()
      .when("userType", (userType, schema) => {
        if (userType.includes("DRIVER")) {
          return schema.required("Must upload your driver's licence");
        }
      }),
    vehicleType: yup.string().when("userType", (userType, schema) => {
      if (userType.includes("DRIVER")) {
        return schema.required("Must have a vehicle type");
      }
    }),
    vehicleModel: yup.string().when("userType", (userType, schema) => {
      if (userType.includes("DRIVER")) {
        return schema.required("Must have a vehicle model");
      }
    }),
    noOfPassengers: yup
      .number()
      .min(1)
      .max(4)
      .when("userType", (userType, schema) => {
        if (userType.includes("DRIVER")) {
          return schema.required("Must define maximum passengers preffered");
        }
      }),
  });

  const arrangeFormDataAndSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    console.log("form values", values);
    formData.append("agreementCheck", values["agreementCheck"]);
    formData.append("nationalIdImageBase64", "string");
    formData.append("userType", values["userType"]);
    formData.append("driversLicenceImageBase64", "string");
    formData.append("vehicleType", values["vehicleType"]);
    formData.append("vehicleModel", values["vehicleModel"]);
    formData.append("noOfPassengers", values["noOfPassengers"]);

    const response = await fetch("/api/rideSharing/profile", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch(setUser(json));
      navigate("/rideSharing");
      console.log("success", json);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    await arrangeFormDataAndSubmit(values, onSubmitProps);
  };

  const convertImageToBase64 = async (image, imageType, setFieldValue) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      console.log("base64 string", reader.result);
      if (imageType === "NATIONAL") {
        setFieldValue("nationalIdImageBase64", "string");
      }
      if (imageType === "DRIVERS") {
        setFieldValue("driversLicenceImageBase64", "string");
      }
    };
    reader.onerror = (error) => {
      console.log("Error converting to base64: ", error);
    };
  };

  return (
    <>
      <WidgetWrapper>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
              <Typography
                fullWidth
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1rem", gridColumn: "span 8" }}
              >
                Let's get you registered for RideShare!
              </Typography>
              <Typography
                fullWidth
                variant="h6"
                sx={{ mb: "1rem", gridColumn: "span 8" }}
              >
                Please submit the below required information and you will be
                verified within two weeks time
              </Typography>

              <Typography
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1rem", gridColumn: "span 8" }}
              >
                Terms and Conditions
              </Typography>
              <Divider sx={{ mb: "1rem", gridColumn: "span 8" }} />
              <Typography
                fontWeight="500"
                variant="h6"
                sx={{ mb: "1rem", gridColumn: "span 8" }}
              >
                These are the conditions.
              </Typography>
              <Box
                width="100%"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 8",
                  },
                }}
              >
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
                <FormControlLabel
                  control={
                    <Checkbox
                      label="Agreement Checkbox"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.agreementCheck}
                      name="agreementCheck"
                      error={
                        Boolean(touched.agreementCheck) &&
                        Boolean(errors.agreementCheck)
                      }
                      helperText={
                        touched.agreementCheck && errors.agreementCheck
                      }
                    />
                  }
                  label="I agree to terms and conditions"
                  sx={{ gridColumn: "span 8" }}
                />

                <Box gridColumn="span 8">
                  <Dropzone
                    accept=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      convertImageToBase64(
                        acceptedFiles[0],
                        "NATIONAL",
                        setFieldValue
                      );
                      setFieldValue("nationalIdImageName", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.nationalIdImageName ? (
                          <p>Upload your National ID here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {values.nationalIdImageName.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  select
                  label="User Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userType}
                  name="userType"
                  error={Boolean(touched.userType) && Boolean(errors.userType)}
                  helperText={touched.userType && errors.userType}
                  sx={{ gridColumn: "span 8" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"PASSENGER"}>
                    Not a driver. Only as a passenger
                  </MenuItem>
                  <MenuItem value={"DRIVER"}>
                    Driver and also passenger
                  </MenuItem>
                </TextField>

                <Box gridColumn="span 8">
                  <Dropzone
                    accept=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      convertImageToBase64(
                        acceptedFiles[0],
                        "DRIVERS",
                        setFieldValue
                      );
                      setFieldValue(
                        "driversLicenceImageName",
                        acceptedFiles[0]
                      );
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.driversLicenceImageName ? (
                          <p>Upload your driver's licence here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {values.driversLicenceImageName.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  select
                  label="Vehicle Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleType}
                  name="vehicleType"
                  error={
                    Boolean(touched.vehicleType) && Boolean(errors.vehicleType)
                  }
                  helperText={touched.vehicleType && errors.vehicleType}
                  sx={{ gridColumn: "span 8" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"CAR"}>Car</MenuItem>
                  <MenuItem value={"BIKE"}>Bike</MenuItem>
                </TextField>

                <TextField
                  label="Vehicle Model"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleModel}
                  name="vehicleModel"
                  error={
                    Boolean(touched.vehicleModel) &&
                    Boolean(errors.vehicleModel)
                  }
                  helperText={touched.vehicleModel && errors.vehicleModel}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  label="Maximum Passengers"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noOfPassengers}
                  name="noOfPassengers"
                  error={
                    Boolean(touched.noOfPassengers) &&
                    Boolean(errors.noOfPassengers)
                  }
                  helperText={touched.noOfPassengers && errors.noOfPassengers}
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
                  APPLY
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </WidgetWrapper>
    </>
  );
};

export default RideShareRegisterForm;
