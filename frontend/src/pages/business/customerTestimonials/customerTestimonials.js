import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert, Box, Button, Dialog, Grid, IconButton, Paper, Rating, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha, styled } from '@mui/material/styles';

// components
import Sidemenu from '../../../components/Sidemenu';

// sections
import AlertCustomerTestimonialDelete from '../../../sections/business/customerTestimonials/AlertCustomerTestimonialDelete';
import CreateEditCustomerTestimonial from '../../../sections/business/customerTestimonials/CreateEditCustomerTestimonial';

// data 

// store
import { useDispatch, useSelector } from '../../../store';
import { fetchTestimonials, toInitialState } from '../../../store/reducers/testimonial';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const CustomerTestimonials = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch();
  const { testimonials, error, success, isLoading } = useSelector(state => state.testimonial);

  const [data, setData] = useState([])

  // API calls
  useEffect(() => {
    dispatch(fetchTestimonials(id));
  }, [dispatch, success, id]);

  useEffect(() => {
    setData(testimonials || []);
  }, [testimonials])

  //  handel error 
  useEffect(() => {
    if (error != null) {
      setState("error")
      setStateDescription(error ? error : "Something went wrong")
      handleClick()
      dispatch(toInitialState());
    }
  }, [error]);

  //  handel success
  useEffect(() => {
    if (success != null) {
      setState("success")
      setStateDescription(success ? success : "This is a success Alert")
      handleClick()
      dispatch(toInitialState())
    }
  }, [success])

  //dialog model 
  const [open, setOpen] = useState(false);
  const [customerTestimonial, setCustomerTestimonial] = useState()

  const onClose = () => {
    setOpen(!open);

    if (customerTestimonial && open) setCustomerTestimonial(undefined);
  };

  //alert model
  const [openAlert, setOpenAlert] = useState(false);
  const [customerTestimonialId, setCustomerTestimonialId] = useState(null)

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  // snack bar
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [state, setState] = useState("success")
  const [stateDescription, setStateDescription] = useState("This is a success Alert")

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <>
      <div className="company-listing">
        <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Customer Testimonials Businesses
        </h2>

        <div className="sub w-full">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="w-full ">
            <div className="">
              <div className="flex flex-row px-20 place-content-center gap-3">
                <Grid container spacing={2}>
                  <Grid item md={9}>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                  </Grid>
                  <Grid item md={3}>
                    <Button
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      fullWidth
                      onClick={() => {
                        setOpen(true)
                      }}
                    >
                      Create Testimonial
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="w-full px-20 mt-4 h-[500px] overflow-auto py-5">
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"> # </TableCell>
                          <TableCell align="left"> Name </TableCell>
                          <TableCell align="left"> Email </TableCell>
                          <TableCell align="left"> Rating </TableCell>
                          <TableCell align="left"> Description </TableCell>
                          <TableCell align="center"> Actions </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data && data.length > 0 ?
                          data.map((testimonial, index) => {
                            return (
                              <>
                                <TableRow
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">{testimonial.name ? testimonial.name : '-'}</TableCell>
                                  <TableCell align="left">{testimonial.email ? testimonial.email : '-'}</TableCell>
                                  <TableCell align="left">{testimonial.rating ? <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                      <Rating
                                        name="rating"
                                        value={testimonial.rating}
                                        readOnly
                                        precision={0.5}
                                      />
                                      <Typography variant="body2" color="text.secondary">
                                        ({testimonial.rating})
                                      </Typography>
                                    </Box>
                                  </>
                                    : '-'}</TableCell>
                                  <TableCell align="left">{testimonial.description ? testimonial.description : '-'}</TableCell>
                                  <TableCell align="center">
                                    <Stack direction={"row"}>
                                      <Tooltip title="Edit Testimonial" placement="right-start">
                                        <IconButton onClick={() => {
                                          setOpen(true)
                                          setCustomerTestimonial(testimonial)
                                        }} size="large" color="primary">
                                          <EditOutlined />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="View Testimonial" placement="right-start">
                                        <IconButton onClick={() => { }} size="large" color="primary">
                                          <VisibilityIcon />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete Testimonial" placement="right-start">
                                        <IconButton onClick={() => {
                                          setOpenAlert(true)
                                          setCustomerTestimonialId(testimonial._id)
                                        }} size="large" color="error">
                                          <DeleteOutlined />
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                  </TableCell>
                                </TableRow>
                              </>
                            )
                          }) :
                          <TableRow>
                            <TableCell align="center" colSpan={6}>
                              No Data to Preview...
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>


      <Dialog
        maxWidth="sm"
        keepMounted
        fullWidth
        onClose={onClose}
        open={open}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <CreateEditCustomerTestimonial onClose={onClose} customerTestimonial={customerTestimonial} businessId={id} />
      </Dialog>
      {customerTestimonialId && <AlertCustomerTestimonialDelete title={""} open={openAlert} handleClose={handleAlertClose} deleteId={customerTestimonialId} businessId={id} />}
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={state}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {stateDescription}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CustomerTestimonials
