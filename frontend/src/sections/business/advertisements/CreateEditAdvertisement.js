// material-ui
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
import { Form, FormikProvider, useFormik } from "formik";
import _ from "lodash";
import FileBase from "react-file-base64";
import * as Yup from "yup";
import { targetAudienceNames } from "../../../data/business";

//data

// store
import { dispatch } from "../../../store";
import {
  addAdvertisement,
  updateAdvertisement,
} from "../../../store/reducers/advertisement";

// constant
const MAX_IMAGE_SIZE = 250;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

// Function to validate the image size
const validateImageSize = (value) => {
  if (value && value.size) {
    const fileSizeInKB = parseFloat(value.size);
    if (fileSizeInKB > MAX_IMAGE_SIZE) {
      return false;
    }
  }
  return true;
};

// Function to validate the image type
const validateImageType = (value) => {
  if (value && value.type && !ALLOWED_IMAGE_TYPES.includes(value.type)) {
    return false;
  }
  return true;
};

const getInitialValues = (advertisement) => {
  const newAdvertisement = {
    _id: "",
    title: "",
    description: "",
    targetAudience: "",
    budget: "",
    image: "",
    validateImage: {
      name: "luffy-dark-1.png",
      type: "image/png",
      size: "73 kB",
      base64: "",
      file: {},
    },
  };

  if (advertisement) {
    return _.merge({}, newAdvertisement, advertisement);
  }

  return newAdvertisement;
};

// ==============================|| Advertisement CREATE / EDIT ||============================== //

const CreateEditAdvertisement = ({ businessId, advertisement, onClose }) => {
  const theme = useTheme();

  const AdvertisementSchema = Yup.object().shape({
    title: Yup.string().required("Advertisement Title is required"),
    validateImage: Yup.mixed()
      .test(
        "fileSize",
        `Image size must be less than ${MAX_IMAGE_SIZE} kB`,
        validateImageSize
      )
      .test(
        "fileType",
        "Only JPEG, PNG, and JPG image formats are allowed",
        validateImageType
      ),
  });

  const formik = useFormik({
    initialValues: getInitialValues(advertisement),
    validationSchema: AdvertisementSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        if (advertisement) {
          // put
          dispatch(updateAdvertisement(businessId, values));
        } else {
          // post
          dispatch(
            addAdvertisement(businessId, {
              title: values.title,
              description: values.description,
              targetAudience: values.targetAudience,
              budget: values.budget,
              image: values.image,
            })
          );
        }
        resetForm();
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{ margin: 0 }}
        >
          <DialogTitle>
            {advertisement ? "Edit Advertisement" : "Create Advertisement"}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="title">
                    Title <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="title"
                    placeholder="Enter Title"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    size="small"
                  />
                </Stack>
              </Grid>
              <Grid item xs={6} md={12}>
                <Stack spacing={0.5}>
                  <InputLabel htmlFor="targetAudience">
                    Target Audience <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="targetAudience"
                    value={
                      targetAudienceNames.find(
                        (option) => option === formik.values.targetAudience
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      formik.setFieldValue("targetAudience", newValue);
                    }}
                    options={targetAudienceNames || []}
                    getOptionLabel={(item) => `${item}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder="Select Target Audience"
                          sx={{
                            "& .MuiAutocomplete-input.Mui-disabled": {
                              WebkitTextFillColor: theme.palette.text.primary,
                            },
                          }}
                        />
                      );
                    }}
                  />
                  {formik.touched.targetAudience &&
                    formik.errors.targetAudience && (
                      <FormHelperText error id="helper-text-targetAudience">
                        {formik.errors.targetAudience}
                      </FormHelperText>
                    )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="budget">
                    Budget <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="budget"
                    type="number"
                    placeholder="Enter Budget"
                    {...getFieldProps("budget")}
                    error={Boolean(touched.budget && errors.budget)}
                    helperText={touched.budget && errors.budget}
                    size="small"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Image </InputLabel>
                  {/* <TextField
                                        id="image"
                                        name="image"
                                        placeholder="Enter Image"
                                        value={formik.values.image}
                                        onChange={formik.handleChange}
                                        error={formik.touched.image && Boolean(formik.errors.image)}
                                        helperText={formik.touched.image && formik.errors.image}
                                        fullWidth
                                        size='small'
                                    /> */}
                  <FileBase
                    type="file"
                    multiple={false}
                    value={formik.values.image}
                    onDone={(e) => {
                      console.log(e);
                      formik.setFieldValue("validateImage", e);
                      formik.setFieldValue("image", e.base64);
                    }}
                  />
                  {formik.touched.validateImage &&
                    formik.errors.validateImage && (
                      <FormHelperText error id="helper-text-validateImage">
                        {formik.errors.validateImage}
                      </FormHelperText>
                    )}
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
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    multiline
                    rows={3}
                    fullWidth
                    size="small"
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item />
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {advertisement ? "Edit" : "Create"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
};

export default CreateEditAdvertisement;
