import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Signup = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required").min(6),
    userType: yup.string().required("required"),
  });

  const initialValuesRegister = {
    email: "",
    password: "",
    userType: "",
  };

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { signup, error, isLoading } = useSignup();

  const handleFormSubmit = async (values, onSubmitProps) => {
    await signup(values);
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
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
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
                  {isSubmitting ? "SIGNING YOU UP" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Already have an account? Login here
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

//   return (
//     <form className="signup" onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>

//       <label>Email</label>
//       <input
//         type="text"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//       />
//       <label>Password</label>
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//       />
//       <label>Type</label>
//       <select
//         id="userType"
//         onChange={(e) => setUserType(e.target.value)}
//         value={userType}
//       >
//         <option value="GENERAL">As a General User</option>
//         <option value="BUSINESS">As a Business</option>
//         <option value="COMPANY">As a Company</option>
//         <option value="CONSULTANT">As a Consultant</option>
//       </select>

//       <button disabled={isLoading}>Sign Up</button>
//       {error && <div className="error">{error}</div>}
//       {emailError && <div className="error">{emailError}</div>}
//     </form>
//   );
// };

export default Signup;
