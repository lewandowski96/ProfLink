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
      <div className="company-listing">
        <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Create Businesses
        </h2>

        <div className="sub w-full">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="w-full ">
            <div className="w-full px-20 h-[500px] overflow-auto py-5">
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
      </div>
    </>
  )
}

export default Create
