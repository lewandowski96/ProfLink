import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from '../../../components/Sidemenu';



const Page = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="business-listing">
                <h2>Page Businesses</h2>
                <div className="sub">
                    <div className="sidemenu">
                        <Sidemenu />
                    </div>
                    <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
                        <Paper sx={{ p: 5 }}>
                            <Grid container spacing={2}>
                            </Grid>
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
