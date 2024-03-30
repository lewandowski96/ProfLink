import React from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageIcon from '@mui/icons-material/Pageview';
import PeopleIcon from '@mui/icons-material/People';
import TestimonialIcon from '@mui/icons-material/RateReview';
import ShopIcon from '@mui/icons-material/Shop';
import ViewIcon from '@mui/icons-material/Visibility';
import { Card, CardContent, Chip, Divider, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Customizing styles for the Card component
const StyledCard = styled(Card)({
    background: '#f0f0f0', // Set background color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow
    borderRadius: '8px', // Add border radius,
});

// Customizing styles for the IconButton component
const StyledIconButton = styled(IconButton)({
    color: '#555', // Set icon color
    '&:hover': {
        color: '#333', // Change icon color on hover
    },
});

export default function BusinessCard({ businessData, setOpenAlert, setBusinessId }) {
    const navigate = useNavigate()
    const { basicDetails } = businessData;

    return (
        <StyledCard>
            <CardContent>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant="h5" sx={{ marginBottom: "8px", color: '#333' }}>
                            {basicDetails && basicDetails.name ? basicDetails.name : "-"}
                        </Typography>
                        <Typography mt={1} variant="subtitle1" color="text.secondary" component="div" style={{ display: 'flex', alignItems: 'center', color: '#777' }}>
                            <div>
                                <BusinessIcon fontSize="small" /> {basicDetails && basicDetails.industry ? basicDetails.industry : "-"}
                            </div>
                            <Divider orientation="vertical" flexItem sx={{ ml: "8px", mr: "8px", backgroundColor: '#ccc' }} />
                            <div>
                                <BusinessCenterIcon fontSize="small" /> {basicDetails && basicDetails.organizationType ? basicDetails.organizationType : "-"}
                            </div>
                            <Divider orientation="vertical" flexItem sx={{ ml: "8px", mr: "8px", backgroundColor: '#ccc' }} />
                            <div>
                                <PeopleIcon fontSize="small" />  {basicDetails && basicDetails.organizationSize ? basicDetails.organizationSize : "-"}
                            </div>
                        </Typography>
                        <Typography variant="body1" component="div" mt={1} >
                            {basicDetails && basicDetails.tagline && basicDetails.tagline.map(tag => (
                                <Chip key={tag} label={`# ${tag}`} variant="outlined" style={{ marginRight: '8px', backgroundColor: '#f5f5f5' }} />
                            ))}
                        </Typography>
                        <Typography variant="body1" component="div" mt={3} style={{ color: '#444' }}>
                            {basicDetails && basicDetails.description ? basicDetails.description : "-"}
                        </Typography>
                    </Grid>

                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: "column" }}>
                        <StyledIconButton
                            onClick={() => {
                                navigate(`/business/view/${businessData._id}`)
                            }}
                            size="small"
                            title="View"
                        >
                            <ViewIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => { 
                                setOpenAlert(true)
                                setBusinessId(businessData._id)
                            }}
                            size="small"
                            title="Delete"
                        >
                            <DeleteIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => {
                                navigate(`/business/edit/${businessData._id}`)
                            }}
                            size="small"
                            title="Edit"
                        >
                            <EditIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => {
                                navigate(`/business/page/${businessData._id}`)
                            }}
                            size="small"
                            title="Page"
                        >
                            <PageIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => {
                                navigate(`/business/customer-testimonials/${businessData._id}`)
                            }}
                            size="small"
                            title="Customer Testimonials"
                        >
                            <TestimonialIcon />
                        </StyledIconButton>
                        <StyledIconButton
                            onClick={() => {
                                navigate(`/business/advertisements/${businessData._id}`)
                            }}
                            size="small"
                            title="Advertisements"
                        >
                            <ShopIcon />
                        </StyledIconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
}
