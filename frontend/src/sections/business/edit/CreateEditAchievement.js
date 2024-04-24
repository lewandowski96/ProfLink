
// material-ui
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    Stack,
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import FileBase from 'react-file-base64';
import * as Yup from 'yup';

//data


// constant
const getInitialValues = (achievement) => {

    const newAchievement = {
        title: "",
        description: '',
        image: ''
    }

    if (achievement) {
        return _.merge({}, newAchievement, achievement);
    }

    return newAchievement;
};

// ==============================|| Achievement CREATE / EDIT ||============================== //

const CreateEditAchievement = ({ achievement, onClose, push }) => {
    const theme = useTheme();

    const AchievementSchema = Yup.object().shape({
        title: Yup.string().required('Achievement title is required'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(achievement),
        validationSchema: AchievementSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (achievement) {
                    // put 
                } else {
                    // post 
                    push({
                        title: values.title,
                        description: values.description,
                        image: values.image
                    })
                }
                resetForm()
                setSubmitting(false);
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ margin: 0 }}>
                    <DialogTitle>{achievement ? 'Edit Achievement' : 'Create Achievement'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1.25}>
                                    <InputLabel htmlFor="title">Title <span style={{ color: 'red' }}>*</span></InputLabel>
                                    <TextField
                                        fullWidth
                                        id="title"
                                        placeholder="Enter title"
                                        {...getFieldProps('title')}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                        size='small'
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
                                        onDone={({ base64 }) => {
                                            formik.setFieldValue('image', base64);
                                        }} />
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
                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                        {achievement ? 'Edit' : 'Create'}
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

export default CreateEditAchievement;
