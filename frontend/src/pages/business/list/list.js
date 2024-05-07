import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

// components
import Sidemenu from "../../../components/Sidemenu";

// sections
import AlertBusinessDelete from "../../../sections/business/list/AlertBusinessDelete";
import BusinessCard from "../../../sections/business/list/BusinessCard";

// store
// import { Navbar } from "@material-tailwind/react";
import { WaterfallChartOutlined } from "@mui/icons-material";
import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "../../../store";
import {
  fetchBusinesses,
  toInitialState,
} from "../../../store/reducers/business";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { business, businesses, error, success, isLoading } = useSelector(
    (state) => state.business
  );

  const [data, setData] = useState([]);

  // API calls
  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch, success]);

  useEffect(() => {
    setData(businesses || []);
  }, [businesses]);

  //  handel error
  useEffect(() => {
    if (error != null) {
      setState("error");
      setStateDescription(error ? error : "Something went wrong");
      handleClick();
      dispatch(toInitialState());
    }
  }, [error]);

  //  handel success
  useEffect(() => {
    if (success != null) {
      setState("success");
      setStateDescription(success ? success : "This is a success Alert");
      handleClick();
      dispatch(toInitialState());
    }
  }, [success]);

  //alert model
  const [openAlert, setOpenAlert] = useState(false);
  const [businessId, setBusinessId] = useState(null);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  // snack bar
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState("success");
  const [stateDescription, setStateDescription] = useState(
    "This is a success Alert"
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="company-listing">
        <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Businesses
        </h2>

        <div className="sub w-full">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="w-full ">
            <div className="">
              <div className="flex flex-row px-20 place-content-center gap-3">
                <Grid container spacing={2}>
                  <Grid item md={8}>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                  </Grid>
                  <Grid item md={2}>
                    <Button
                      variant="contained"
                      startIcon={<WaterfallChartOutlined />}
                      fullWidth
                      onClick={() => {
                        navigate(`/business/analytics`);
                      }}
                      color="warning"
                    >
                      Analytics
                    </Button>
                  </Grid>
                  <Grid item md={2}>
                    <Button
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      fullWidth
                      onClick={() => {
                        navigate(`/business/create`);
                      }}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="w-full px-20 mt-4 h-[500px] overflow-auto py-5">
              <Grid container spacing={2}>
                {isLoading ? (
                  <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    {data && data.length > 0 ? (
                      data.map((business, index) => {
                        return (
                          <Grid item key={index} xs={12} md={12}>
                            <BusinessCard
                              businessData={business}
                              setOpenAlert={setOpenAlert}
                              setBusinessId={setBusinessId}
                            />
                          </Grid>
                        );
                      })
                    ) : (
                      <Grid
                        item
                        xs={12}
                        md={12}
                        style={{ textAlign: "center" }}
                      >
                        No Business to view...
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </div>
          </div>
        </div>
      </div>

      {businessId && (
        <AlertBusinessDelete
          title={""}
          open={openAlert}
          handleClose={handleAlertClose}
          deleteId={businessId}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={state}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {stateDescription}
        </Alert>
      </Snackbar>
    </>
  );
};

export default List;
