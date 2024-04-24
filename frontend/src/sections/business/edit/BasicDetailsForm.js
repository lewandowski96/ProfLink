// material-ui
import { Alert, Autocomplete, Button, Checkbox, FormControlLabel, FormHelperText, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// data
import { useState } from 'react';
import { industries, organizationSizes, organizationTypes, users } from '../../../data/business';

const validationSchema = yup.object({
  userId: yup.string().required('User is required'),
  name: yup.string().required('Name is required'),
  industry: yup.string().required('Industry is required'),
  organizationType: yup.string().required('Organization Type is required'),
  organizationSize: yup.string().required('Organization Size is required'),
  tagline: yup.string().matches(/^([\w\s]+)(,\s*[\w\s]+)*$/, 'Enter tags separated by commas'),
  // description: yup.string().required('Description is required'),  
});

// ==============================|| VALIDATION WIZARD - ADDRESS  ||============================== //

const BasicDetailsForm = ({ basicDetailsData, setBasicDetailsData, handleNext, setErrorIndex }) => {
  const theme = useTheme();

  const [userType, setUserType] = useState("admin")

  const formik = useFormik({
    initialValues: {
      userId: basicDetailsData.userId,
      name: basicDetailsData.name,
      industry: basicDetailsData.industry,
      organizationType: basicDetailsData.organizationType,
      organizationSize: basicDetailsData.organizationSize,
      tagline: basicDetailsData.tagline,
      description: basicDetailsData.description,
      legalBackgroundVerification: basicDetailsData.legalBackgroundVerification,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setBasicDetailsData({
        userId: values.userId,
        name: values.name,
        industry: values.industry,
        organizationType: values.organizationType,
        organizationSize: values.organizationSize,
        tagline: values.tagline,
        description: values.description,
        legalBackgroundVerification: values.legalBackgroundVerification,
      });
      handleNext();
    }
  });

  const alertText = userType === 'admin' ?
    "You are about to edit a business. Please select the user who is authorized to act on behalf of this organization." :
    "You are about to edit a business. Please ensure that you are authorized to act on behalf of this organization. If you are not authorized, please contact your organization's administrator. You will register using your own user account.";



  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Basic Details
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms" style={{ margin: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={12}>
            <Alert severity='warning' >
              <Grid container spacing={0}>
                <Grid item xs={6} md={9}>
                  {alertText}
                </Grid>
                <Grid item xs={6} md={3}>
                  <Stack spacing={0.5}>
                    <Autocomplete
                      fullWidth
                      size='small'
                      id="userId"
                      disabled={userType == "admin" ? false : true}
                      value={users.find((option) => option.id === formik.values.userId) || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('userId', newValue.id);
                      }}
                      options={users || []}
                      getOptionLabel={(item) => `${item.name}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder="Select User"
                            sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                          />
                        )
                      }}
                    />
                    {formik.touched.userId && formik.errors.userId && (
                      <FormHelperText error id="helper-text-userId">
                        {formik.errors.userId}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              <InputLabel>Name <span style={{ color: 'red' }}>*</span></InputLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                size='small'
              />
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack spacing={0.5}>
              <InputLabel htmlFor="industry">Industry <span style={{ color: 'red' }}>*</span></InputLabel>
              <Autocomplete
                fullWidth
                size='small'
                id="industry"
                value={industries.find((option) => option === formik.values.industry) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('industry', newValue);
                }}
                options={industries || []}
                getOptionLabel={(item) => `${item}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Industry"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  )
                }}
              />
              {formik.touched.industry && formik.errors.industry && (
                <FormHelperText error id="helper-text-industry">
                  {formik.errors.industry}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack spacing={0.5}>
              <InputLabel htmlFor="organizationType">Organization Type <span style={{ color: 'red' }}>*</span></InputLabel>
              <Autocomplete
                fullWidth
                size='small'
                id="organizationType"
                value={organizationTypes.find((option) => option === formik.values.organizationType) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('organizationType', newValue);
                }}
                options={organizationTypes || []}
                getOptionLabel={(item) => `${item}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Organization Type"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  )
                }}
              />
              {formik.touched.organizationType && formik.errors.organizationType && (
                <FormHelperText error id="helper-text-organizationType">
                  {formik.errors.organizationType}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack spacing={0.5}>
              <InputLabel htmlFor="organizationSize">Organization Size <span style={{ color: 'red' }}>*</span></InputLabel>
              <Autocomplete
                fullWidth
                size='small'
                id="organizationSize"
                value={organizationSizes.find((option) => option === formik.values.organizationSize) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('organizationSize', newValue);
                }}
                options={organizationSizes || []}
                getOptionLabel={(item) => `${item}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Organization Size"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  )
                }}
              />
              {formik.touched.organizationSize && formik.errors.organizationSize && (
                <FormHelperText error id="helper-text-organizationSize">
                  {formik.errors.organizationSize}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>Tag Line </InputLabel>
              <TextField
                id="tagline"
                name="tagline"
                placeholder="Enter Tag Line"
                value={formik.values.tagline}
                onChange={formik.handleChange}
                error={formik.touched.tagline && Boolean(formik.errors.tagline)}
                // helperText={formik.touched.tagline && formik.errors.tagline}
                fullWidth
                size='small'
                helperText={formik.touched.tagline && formik.errors.tagline ? formik.errors.tagline : "Enter tags separated by commas"}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>Description </InputLabel>
              <TextField
                id="description"
                name="description"
                placeholder="Enter description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                rows={3}
                fullWidth
                size='small'
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="legalBackgroundVerification" value="yes" />}
              label="I verify that I am an authorized representative of this organization and have the right to act on it's behalf in the creation and management of this page. The organization and I agree to the additional terms for pages"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                Next
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BasicDetailsForm;
