import React from "react";

// material-ui
import { Grid, Paper, Card, CardContent, Typography, Icon } from "@mui/material";
import { Pageview, Business, AttachMoney, Star } from "@mui/icons-material"; // Importing MUI icons
import ApexCharts from "react-apexcharts"; // Import ApexCharts

// components
import Sidemenu from "../../../components/Sidemenu";
import Navbar from "../../../components/Navbar";

const Analytics = () => {
  // Mock data for the cards
  const pageVisits = 5000; // Example number of business page visits
  const onboardedBusinesses = 100; // Example number of onboarded businesses
  const revenueGenerated = "$150,000"; // Example of revenue generated
  const testimonialsCount = 50; // Example number of testimonials
  const advertisementsCount = 4; // Example number of advertisements

  // Data for the chart
  const productsData = {
    series: [
      {
        data: [450, 580, 320, 690, 510],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Cloud Services",
        "Cybersecurity Solutions",
        "Data Analytics Tools",
        "Enterprise Software",
        "Networking Equipment",
      ],
    },
  };

  return (
    <>
      <Navbar />
      <div className="company-listing">
        <h2 className="relative left-10 top-0 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Analytics
        </h2>

        <div className="sub w-full">
          {/* <div className="sidemenu">
            <Sidemenu />
          </div> */}
          <div className="w-full ">
            <div className="w-full px-20 h-[700px] overflow-auto py-5">
              <Paper sx={{ p: 5 }}>
                {/* Top row cards */}
                <Grid container spacing={2} mb={4}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: "#F9A825" }} elevation={3}>
                      <CardContent>
                        <Icon style={{ fontSize: 50 }}>
                          <Pageview />
                        </Icon>
                        <Typography variant="h4" component="h2" align="center">
                          {pageVisits}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          Business Page Visits
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: "#4CAF50" }} elevation={3}>
                      <CardContent>
                        <Icon style={{ fontSize: 50 }}>
                          <Business />
                        </Icon>
                        <Typography variant="h4" component="h2" align="center">
                          {onboardedBusinesses}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          Onboarded Businesses
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: "#3F51B5" }} elevation={3}>
                      <CardContent>
                        <Icon style={{ fontSize: 50 }}>
                          <AttachMoney />
                        </Icon>
                        <Typography variant="h4" component="h2" align="center">
                          {revenueGenerated}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          Revenue Generated
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Charts */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Product Sales Data
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                      Sales performance of different product categories
                    </Typography>
                    <ApexCharts
                      options={productsData}
                      series={productsData.series}
                      type="bar"
                      height={350}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Customer Testimonials
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                      Number of testimonials received from satisfied customers
                    </Typography>
                    <Card sx={{ backgroundColor: "#FF9800" }} elevation={3}>
                      <CardContent>
                        <Icon style={{ fontSize: 50 }}>
                          <Star />
                        </Icon>
                        <Typography variant="h4" component="h2" align="center">
                          {testimonialsCount}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          Satisfied Customers
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Advertisements */}
                <Typography variant="h5" align="center" gutterBottom mt={4}>
                  Advertisements
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Showcase of advertisements promoting various businesses
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {[...Array(advertisementsCount)].map((_, index) => (
                    <Grid item key={index}>
                      {/* Placeholder for advertisement */}
                      <Paper style={{ width: 200, height: 150, backgroundColor: "#E0E0E0" }} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
