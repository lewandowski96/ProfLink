// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';
// import Sidemenu from '../components/Sidemenu';
// import {
//     Card,
//     CardBody,
//     CardHeader,
//     Typography,
// } from "@material-tailwind/react";
// import Chart from "react-apexcharts";
// import { ChartPieIcon, ChartLineIcon, ChartBarIcon, ChartDonutIcons } from '@heroicons/react/outline';

// const chartConfig = {
//     type: "pie",
//     width: 450,
//     height: 350,
//     series: [20.4, 26.8, 52.8],
//     options: {
//         labels: ['Applicants', 'Shortlisted', 'Hired'],
//         colors: ['#FFD700', '#FFA500', '#FF6347'],
//         legend: {
//             show: true,
//             position: 'bottom',
//         },
//     },
// };

// const lineChartConfig = {
//     type: "line",
//     width: 450,
//     height: 300,
//     series: [{
//         name: 'Series 1',
//         data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
//     }],
//     options: {
//         chart: {
//             foreColor: '#333',
//         },
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],

//         },

//     },
// };

// const barChartConfig = {
//     type: "bar",
//     width: 450,
//     height: 300,
//     series: [{
//         name: 'Series 1',
//         data: [44, 55, 41, 67, 22, 43]
//     }],
//     options: {
//         chart: {
//             foreColor: '#333',
//         },
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         },

//     },
// };

// const donutChartConfig = {
//     type: "donut",
//     width: 480,
//     height: 350,
//     series: [60, 30, 10],
//     options: {
//         chart: {
//             toolbar: {
//                 show: false,
//             },
//         },
//         title: {
//             show: false,
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         colors: ["#00897b", "#ff8f00", "#d81b60"],
//         legend: {
//             show: true,
//             position: 'right',
//             horizontalAlign: 'center',
//             floating: false,
//             fontSize: '16px',
//             fontFamily: 'Poppins, sans-serif',
//             fontWeight: 600,
//             labels: {
//                 colors: ["#333"],
//                 useSeriesColors: true,
//                 formatter: function (seriesName, opts) {
//                     return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`;
//                 },
//                 style: {
//                     fontSize: '14px',
//                     horizontalAlign: 'center',
//                     fontFamily: 'Poppins, sans-serif',
//                     fontWeight: 400,
//                 },
//             },
//             markers: {
//                 width: 8,
//                 height: 8,
//                 strokeWidth: 0,
//                 strokeColor: '#fff',
//                 fillColors: undefined,
//                 radius: 12,
//                 customHTML: undefined,
//                 onClick: undefined,
//                 offsetX: 0,
//                 offsetY: 0,
//             },
//             itemMargin: {
//                 horizontal: 8,
//                 vertical: 4
//             },
//         },
//         labels: ['Sales', 'Expenses', 'Profit']
//     },
// };


// const ComAnalytics = () => {
//     return (
//         <div className="view-consultant-profile">
//             <h2 className="text-3xl relative left-24 font-mono">Company Analytics</h2>
//             <div className="sub gap-10 w-full">
//                 <div className="sidemenu">
//                     <Sidemenu />
//                 </div>

//                 <div className="mt-20 grid  m-auto w-full grid-cols-1 md:grid-cols-2 gap-10">

//                     <div className="w-full">
//                         <Card className='pb-20 bg-slate-300'>
//                             <CardHeader
//                                 floated={false}
//                                 shadow={false}
//                                 color="transparent"
//                                 className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
//                             >
//                                 <div className='w-full'>
//                                     <Typography
//                                         variant="small"
//                                         color="gray"
//                                         className="max-w-sm font-bold text-center text-xl"
//                                     >
//                                         Applicant Engagement Metrics
//                                     </Typography>
//                                 </div>
//                             </CardHeader>
//                             <CardBody className="mt-4 grid place-items-center px-2">
//                                 <Chart {...chartConfig} />
//                             </CardBody>
//                         </Card>
//                     </div>

//                     <div className="w-full">
//                         <Card className='pb-20 bg-slate-300'>
//                             <CardHeader
//                                 floated={false}
//                                 shadow={false}
//                                 color="transparent"
//                                 className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
//                             >
//                                 <div className='w-full'>
//                                     <Typography
//                                         variant="small"
//                                         color="gray"
//                                         className="max-w-sm font-bold text-center text-xl"
//                                     >
//                                         Line Chart
//                                     </Typography>
//                                 </div>
//                             </CardHeader>
//                             <CardBody className="mt-4 grid place-items-center px-2">
//                                 <Chart {...lineChartConfig} />
//                             </CardBody>
//                         </Card>
//                     </div>

//                     <div className="w-full">
//                         <Card className='pb-20 bg-slate-300'>
//                             <CardHeader
//                                 floated={false}
//                                 shadow={false}
//                                 color="transparent"
//                                 className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
//                             >
//                                 <div className='w-full'>
//                                     <Typography
//                                         variant="small"
//                                         color="gray"
//                                         className="max-w-sm font-bold text-center text-xl"
//                                     >
//                                         Bar Chart
//                                     </Typography>
//                                 </div>
//                             </CardHeader>
//                             <CardBody className="mt-4 grid place-items-center px-2">
//                                 <Chart {...barChartConfig} />
//                             </CardBody>
//                         </Card>
//                     </div>

//                     <div className="w-full">
//                         <Card className='pb-20 bg-slate-300'>
//                             <CardHeader
//                                 floated={false}
//                                 shadow={false}
//                                 color="transparent"
//                                 className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
//                             >
//                                 <div className='w-full'>
//                                     <Typography
//                                         variant="small"
//                                         color="gray"
//                                         className="max-w-sm font-bold text-center text-xl"
//                                     >
//                                         Donut Chart
//                                     </Typography>
//                                 </div>
//                             </CardHeader>
//                             <CardBody className="mt-4 grid place-items-center px-2">
//                                 <Chart {...donutChartConfig} />
//                             </CardBody>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ComAnalytics;
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Sidemenu from '../components/Sidemenu';
import { ChartPieIcon, ChartLineIcon, ChartBarIcon, ChartDonutIcon } from '@heroicons/react/outline';

const ComAnalytics = () => {

    const randomPieChartData = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
    ];
    const [pieChartData, setPieChartData] = useState(randomPieChartData);

    const randomLineChartData = [
        {
            name: 'Post 1',
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
        },
        {
            name: 'Post 2',
            data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100))
        }
    ];
    const [lineChartData, setLineChartData] = useState(randomLineChartData);

    const randomBarChartData = [
        {
            name: '2023',
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
        },
        {
            name: '2024',
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
        }
    ];
    const [barChartData, setBarChartData] = useState(randomBarChartData);


    const [donutChartData, setDonutChartData] = useState(randomPieChartData);



    useEffect(() => {
        // Fetch data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch data for pie chart
            const pieResponse = await fetch('https://api.example.com/pieData');
            const pieData = await pieResponse.json();
            setPieChartData(pieData);

            // Fetch data for line chart
            const lineResponse = await fetch('https://api.example.com/lineData');
            const lineData = await lineResponse.json();
            setLineChartData(lineData);

            // Fetch data for bar chart
            const barResponse = await fetch('https://api.example.com/barData');
            const barData = await barResponse.json();
            setBarChartData(barData);

            // Fetch data for donut chart
            const donutResponse = await fetch('https://api.example.com/donutData');
            const donutData = await donutResponse.json();
            setDonutChartData(donutData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const pieChartConfig = {
        type: "pie",
        width: 450,
        height: 350,
        series: pieChartData,
        options: {
            labels: ['Applicants', 'Shortlisted', 'Hired'],
            colors: ['#FFD700', '#FFA500', '#FF6347'],
            legend: {
                show: true,
                position: 'bottom',
            },
        },
    };

    const lineChartConfig = {
        type: "line",
        width: 450,
        height: 300,
        series: lineChartData,
        options: {
            chart: {
                foreColor: '#333',
            },
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
        },
    };

    const barChartConfig = {
        type: "bar",
        width: 450,
        height: 300,
        series: barChartData,
        options: {
            chart: {
                foreColor: '#333',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
        },
    };

    const donutChartConfig = {
        type: "donut",
        width: 520,
        height: 350,
        series: donutChartData,
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
                position: 'right',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                labels: {
                    colors: ["#333"],
                    useSeriesColors: true,
                    formatter: function (seriesName, opts) {
                        return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`;
                    },
                    style: {
                        fontSize: '14px',
                        horizontalAlign: 'center',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                    },
                },
                markers: {
                    width: 8,
                    height: 8,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 4
                },
            },
            labels: ['Companies', 'General Users', 'Consultants']
        },
    };

    return (
        <div className="view-consultant-profile">
            <h2 className="text-3xl relative font-mono">Company Analytics</h2>
            <div className="sub gap-10 w-full flex">
                <div className="sidemenu">
                    <Sidemenu />
                </div>

                <div className="mt-20 grid  m-auto w-full grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="w-full">
                        <Card className='pb-20 bg-slate-300'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className='w-full'>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-bold text-center text-xl"
                                    >
                                        Job Posts Analysis
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="mt-4 grid place-items-center px-2">
                                <Chart {...pieChartConfig} />
                            </CardBody>
                        </Card>
                    </div>

                    <div className="w-full">
                        <Card className='pb-20 bg-slate-300'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className='w-full'>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-bold text-center text-xl"
                                    >
                                        Job Views Trend
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="mt-4 grid place-items-center px-2">
                                <Chart {...lineChartConfig} />
                            </CardBody>
                        </Card>
                    </div>

                    <div className="w-full">
                        <Card className='pb-20 bg-slate-300'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className='w-full'>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-bold text-center text-xl"
                                    >
                                        Likes on Job Posts
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="mt-4 grid place-items-center px-2">
                                <Chart {...barChartConfig} />
                            </CardBody>
                        </Card>
                    </div>

                    <div className="w-full">
                        <Card className='pb-20 bg-slate-300'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className='w-full'>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-bold text-center text-xl"
                                    >
                                        Page Visits
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="mt-4 grid place-items-center px-2">
                                <Chart {...donutChartConfig} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComAnalytics;