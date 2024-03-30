
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
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

//data
import { industries } from '../../../data/business';


// constant
const getInitialValues = (product) => {

    const newProduct = {
        name: '',
        industry: '',
        description: '',
        image: ''
    }

    if (product) {
        return _.merge({}, newProduct, product);
    }

    return newProduct;
};

// ==============================|| PRODUCT CREATE / EDIT ||============================== //

const CreateEditProduct = ({ product, onClose, push }) => {
    const theme = useTheme();

    const ProductSchema = Yup.object().shape({
        name: Yup.string().required('Product Name is required'),
        industry: Yup.string().required('Product Industry is required'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(product),
        validationSchema: ProductSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (product) {
                    // put 
                } else {
                    // post 
                    push({
                        name: values.name,
                        industry: values.industry,
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
                    <DialogTitle>{product ? 'Edit Product' : 'Create Product'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1.25}>
                                    <InputLabel htmlFor="name">Name <span style={{ color: 'red' }}>*</span></InputLabel>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        placeholder="Enter Name"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
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
                            <Grid item xs={12} sm={12}>
                                <Stack spacing={0.5}>
                                    <InputLabel>Image </InputLabel>
                                    <TextField
                                        id="image"
                                        name="image"
                                        placeholder="Enter Image"
                                        value={formik.values.image}
                                        onChange={formik.handleChange}
                                        error={formik.touched.image && Boolean(formik.errors.image)}
                                        helperText={formik.touched.image && formik.errors.image}
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
                                        {product ? 'Edit' : 'Create'}
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

export default CreateEditProduct;
