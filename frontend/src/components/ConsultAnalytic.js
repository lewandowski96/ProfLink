import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import Navbar from "./Navbar";

const ConsultAnalytic = () => {
  // Sample monthly project data
  const monthlyProjectsData = [
    { month: "Jan", price: 2000, duration: 10 },
    { month: "Feb", price: 2500, duration: 12 },
    { month: "Mar", price: 1800, duration: 8 },
    { month: "Apr", price: 3000, duration: 15 },
  ];

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h4" style={{ marginBottom: "16px", color: "#333" }}>Analytics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
              <Typography variant="h6" style={{ marginBottom: "8px", color: "#555" }}>Total Consultations</Typography>
              <Typography variant="h4" style={{ color: "#007bff", fontWeight: "bold", marginBottom: "16px" }}>100</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
              <Typography variant="h6" style={{ marginBottom: "8px", color: "#555" }}>Average Rating</Typography>
              <Typography variant="h4" style={{ color: "#28a745", fontWeight: "bold", marginBottom: "16px" }}>4.5</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
              <Typography variant="h6" style={{ marginBottom: "8px", color: "#555" }}>Profile Viewing</Typography>
              <Typography variant="h4" style={{ color: "#007bff", fontWeight: "bold", marginBottom: "16px" }}>50</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
              <Typography variant="h6" style={{ marginBottom: "8px", color: "#555" }}>Search Appearance</Typography>
              <Typography variant="h4" style={{ color: "#28a745", fontWeight: "bold", marginBottom: "16px" }}>70%</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
              <Typography variant="h6" style={{ marginBottom: "8px", color: "#555" }}>Monthly Projects</Typography>
              {monthlyProjectsData.map((project, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <Typography variant="subtitle1" style={{ marginBottom: "8px", color: "#777" }}>{project.month}</Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <div style={{ width: `${project.price / 40}px`, height: "20px", backgroundColor: "#007bff", borderRadius: "5px", marginBottom: "8px" }}></div>
                      <div style={{ width: `${project.duration * 5}px`, height: "20px", backgroundColor: "#28a745", borderRadius: "5px" }}></div>
                    </div>
                    <div style={{ flex: "1", paddingLeft: "10px" }}>
                      <div>Price: ${project.price}</div>
                      <div>Duration: {project.duration} days</div>
                    </div>
                  </div>
                </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ConsultAnalytic;
