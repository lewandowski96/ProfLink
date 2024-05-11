import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from '../hooks/useAuthContext';
import { ChartPieIcon } from "@heroicons/react/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Sidemenu from "../components/Sidemenu";

const chartConfig = {
  type: "pie",
  width: 550,
  height: 550,
  series: [20.4, 26.8, 52.8],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00897b", "#ff8f00", "#d81b60"],
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
      floating: false,
      fontSize: "16px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      labels: {
        colors: ["#333"],
        useSeriesColors: true,
        formatter: function (seriesName, opts) {
          return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`;
        },
        style: {
          fontSize: "14px",
          horizontalAlign: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
        },
      },
      markers: {
        width: 8,
        height: 8,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    labels: ["Likes", "Profile Viewers", "Followers"],
  },
};

const ComAnalytics = () => {
  return (
    <div className="view-consultant-profile">
      <h2 className="text-3xl relative left-24 font-mono">Company Analytics</h2>
      <div className="sub gap-10 w-full">
        <div className="sidemenu">
          <Sidemenu />
        </div>

        <div className="mt-20 m-auto w-1/2">
          <Card className="m-auto pb-20 bg-slate-300">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-full">
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-bold text-center text-xl"
                >
                  Applicant Engagement Metrics
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComAnalytics;
