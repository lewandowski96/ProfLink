import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from "../../../components/Sidemenu";

// sections
import BusinessEditStepperForm from "../../../sections/business/edit";

// store
import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "../../../store";
import { fetchBusiness } from "../../../store/reducers/business";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { business } = useSelector((state) => state.business);
  const { id } = useParams();

  // API calls
  useEffect(() => {
    dispatch(fetchBusiness(id));
  }, [dispatch, id]);

  return (
    <>
      <Navbar />
      <div className="company-listing">
        <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Edit Businesses
        </h2>

        <div className="sub w-full">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="w-full ">
            <div className="w-full px-20   h-[500px] overflow-auto py-5">
              <Paper sx={{ p: 5 }}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <BusinessEditStepperForm business={business} />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
