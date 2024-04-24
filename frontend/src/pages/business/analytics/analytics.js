import React from 'react';

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from '../../../components/Sidemenu';

// sections 

const Analytics = () => { 

    return (
        <>
            <div className="company-listing">
                <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
                    Analytics
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

export default Analytics
