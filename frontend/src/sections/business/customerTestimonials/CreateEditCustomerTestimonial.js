
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
import * as Yup from 'yup';

// store
import { dispatch } from '../../../store';
import { addTestimonial, updateTestimonial } from '../../../store/reducers/testimonial';

//data


// constant
const getInitialValues = (customerTestimonial) => {

    const newCustomerTestimonial = {
        _id: '',
        name: '',
        email: '',
        rating: '',
        description: '',
    }

    if (customerTestimonial) {
        return _.merge({}, newCustomerTestimonial, customerTestimonial);
    }

    return newCustomerTestimonial;
};

// ==============================|| CustomerTestimonial CREATE / EDIT ||============================== //

const CreateEditCustomerTestimonial = ({ businessId, customerTestimonial, onClose }) => {
    const theme = useTheme();

    const CustomerTestimonialSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        rating: Yup.string().required('Rating is required'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(customerTestimonial),
        validationSchema: CustomerTestimonialSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (customerTestimonial) {
                   // put 
                   dispatch(updateTestimonial(businessId, values))
                } else {
                   // post  
                   dispatch(addTestimonial(businessId, {
                    name: values.name,
                    email: values.email,
                    rating: values.rating,
                    description: values.description,
                }))
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
                    <DialogTitle>{customerTestimonial ? 'Edit Customer Testimonial' : 'Create Customer Testimonial'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1.25}>
                                    <InputLabel htmlFor="name">Name <span style={{ color: 'red' }}>*</span></InputLabel>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        placeholder="Enter name"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1.25}>
                                    <InputLabel htmlFor="email">Email <span style={{ color: 'red' }}>*</span></InputLabel>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        type='email'
                                        placeholder="Enter email"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Rating </InputLabel>
                                    <TextField
                                        id="rating"
                                        name="rating"
                                        placeholder="Enter rating"
                                        value={formik.values.rating}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rating && Boolean(formik.errors.rating)}
                                        helperText={formik.touched.rating && formik.errors.rating}
                                        fullWidth
                                        size='small'
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
                                        {customerTestimonial ? 'Edit' : 'Create'}
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

export default CreateEditCustomerTestimonial;
