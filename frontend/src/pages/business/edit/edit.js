import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from '../../../components/Sidemenu';

// sections 
import BusinessEditStepperForm from "../../../sections/business/edit";

// store
import { useDispatch, useSelector } from '../../../store';
import { fetchBusiness } from '../../../store/reducers/business';

const Edit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { business } = useSelector(state => state.business);
  const { id } = useParams()

  // API calls
  useEffect(() => {
    dispatch(fetchBusiness(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="business-listing">
        <h2>Edit Businesses</h2>
        <div className="sub">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
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
    </>
  )
}

export default Edit
