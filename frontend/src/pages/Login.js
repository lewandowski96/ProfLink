import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    userType: yup.string().required("required"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
    userType: "",
  };

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { login, error, isLoading } = useLogin();

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values);
    if (!error) {
      onSubmitProps.resetForm();
    }
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ProfLink
        </Typography>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to ProfLink, your professional community.
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  value={values.userType}
                  onChange={handleChange}
                  select
                  label="Who are you?"
                  onBlur={handleBlur}
                  name="userType"
                  error={Boolean(touched.userType) && Boolean(errors.userType)}
                  // helperText={touched.text && errors.text}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"GENERAL"}>Generic User</MenuItem>
                  <MenuItem value={"BUSINESS"}>Businessman</MenuItem>
                  <MenuItem value={"COMPANY"}>Company</MenuItem>
                  <MenuItem value={"CONSULTANT"}>Consulatant</MenuItem>
                </TextField>
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
                  {isSubmitting ? "LOGGING YOU IN" : "LOGIN"}
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/signup");
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Don't have an account? Sign Up here
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
