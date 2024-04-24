import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert, Button, Dialog, Grid, IconButton, Paper, Snackbar, Stack, Tooltip } from "@mui/material";
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
import AlertAdvertisementDelete from '../../../sections/business/advertisements/AlertAdvertisementDelete';
import CreateEditAdvertisement from '../../../sections/business/advertisements/CreateEditAdvertisement';

// data 

// store
import { useDispatch, useSelector } from '../../../store';
import { fetchAdvertisements, toInitialState } from '../../../store/reducers/advertisement';

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


const Advertisements = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch();
  const { advertisements, error, success, isLoading } = useSelector(state => state.advertisement);

  const [data, setData] = useState([])

  // API calls
  useEffect(() => {
    dispatch(fetchAdvertisements(id));
  }, [dispatch, success, id]);

  useEffect(() => {
    setData(advertisements || []);
  }, [advertisements])

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
  const [advertisement, setAdvertisement] = useState()

  const onClose = () => {
    setOpen(!open);

    if (advertisement && open) setAdvertisement(undefined);
  };

  //alert model
  const [openAlert, setOpenAlert] = useState(false);
  const [advertisementId, setAdvertisementId] = useState(null)

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
      <div className="business-listing">
        <h2>Advertisements Businesses</h2>
        <div className="sub">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
            <Paper sx={{ p: 5 }}>
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
                    Create Advertisement
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"> # </TableCell>
                          <TableCell align="left"> Title </TableCell>
                          <TableCell align="left"> Target Audience </TableCell>
                          <TableCell align="left"> Budget </TableCell>
                          <TableCell align="left"> Description </TableCell>
                          <TableCell align="left"> Image </TableCell>
                          <TableCell align="center"> Actions </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data && data.length > 0 ?
                          data.map((advertisement, index) => {
                            return (
                              <>
                                <TableRow
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">{advertisement.title ? advertisement.title : '-'}</TableCell>
                                  <TableCell align="left">{advertisement.targetAudience ? advertisement.targetAudience : '-'}</TableCell>
                                  <TableCell align="left">{advertisement.budget ? advertisement.budget : '-'}</TableCell>
                                  <TableCell align="left">{advertisement.description ? advertisement.description : '-'}</TableCell>
                                  <TableCell align="left">{advertisement.image ? <img height={85} width={125} src={advertisement.image} title={advertisement.title} /> : '-'}</TableCell>
                                  <TableCell align="center" spacing={1}>
                                    <Stack direction={"row"}>
                                      <Tooltip title="Edit Testimonial" placement="right-start">
                                        <IconButton onClick={() => {
                                          setOpen(true)
                                          setAdvertisement(advertisement)
                                        }} size="large" color="info">
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
                                          setAdvertisementId(advertisement._id)
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
            </Paper>
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
        <CreateEditAdvertisement onClose={onClose} advertisement={advertisement} businessId={id} />
      </Dialog>
      {advertisementId && <AlertAdvertisementDelete title={""} open={openAlert} handleClose={handleAlertClose} deleteId={advertisementId} businessId={id} />}
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

export default Advertisements
