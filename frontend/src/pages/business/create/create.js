import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from '../../../components/Sidemenu';

// sections 
import BusinessCreateStepperForm from "../../../sections/business/create";

const Create = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="business-listing">
        <h2>Create Businesses</h2>
        <div className="sub">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
            <Paper sx={{ p: 5 }}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <BusinessCreateStepperForm />
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
