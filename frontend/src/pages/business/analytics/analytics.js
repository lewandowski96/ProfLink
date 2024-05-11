import React from "react";

// material-ui
import { Grid, Paper } from "@mui/material";

// components
import Sidemenu from "../../../components/Sidemenu";

// third-party
import ApexCharts from "react-apexcharts";
import Navbar from "../../../components/Navbar";

const Analytics = () => {
  const productsData = {
    series: [
      {
        data: [450, 580, 320, 690, 510], // Updated product sales data
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

  const testimonialsData = {
    series: [30, 40, 45, 50, 49, 60, 70, 91],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      },
    },
  };

  const achievementsData = {
    series: [80, 50, 30, 40, 60],
    options: {
      chart: {
        type: "radar",
      },
      xaxis: {
        categories: [
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
          "Category 5",
        ],
      },
    },
  };

  const advertisementsData = {
    series: [20, 30, 15, 35],
    options: {
      labels: [
        "Advertisement 1",
        "Advertisement 2",
        "Advertisement 3",
        "Advertisement 4",
      ],
      chart: {
        type: "donut",
      },
    },
  };

  const options = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
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
            <div className="w-full px-20 h-[500px] overflow-auto py-5">
              <Paper sx={{ p: 5 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <ApexCharts
                      options={productsData}
                      series={productsData.series}
                      type="bar"
                      height={350}
                      width={350}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ApexCharts
                      options={testimonialsData.options}
                      series={testimonialsData.series}
                      type="line"
                      height={350}
                      width={350}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ApexCharts
                      options={achievementsData.options}
                      series={achievementsData.series}
                      type="radar"
                      height={350}
                      width={350}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ApexCharts
                      options={advertisementsData.options}
                      series={advertisementsData.series}
                      type="donut"
                      height={350}
                      width={350}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ApexCharts
                      options={options}
                      series={options.series}
                      type="bar"
                      height={350}
                    />
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

export default Analytics;
