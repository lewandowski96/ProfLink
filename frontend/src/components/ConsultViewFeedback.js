import React from "react";
import { Typography } from "@mui/material";
import Navbar from "./Navbar";

const ConsultViewFeedback = () => {
  // Sample feedback data
  const feedbackData = [
    { id: 1, rating: 4, feedback: "Great service! Very helpful." },
    { id: 2, rating: 5, feedback: "Excellent experience. Highly recommended." },
    { id: 3, rating: 3, feedback: "Good, but could be improved." },
    { id: 4, rating: 5, feedback: "Fantastic service! Couldn't be happier." },
    { id: 5, rating: 2, feedback: "Not satisfied with the service provided." },
    { id: 6, rating: 4, feedback: "Overall, a good experience." },
    { id: 7, rating: 3, feedback: "Average service, nothing exceptional." },
    { id: 8, rating: 5, feedback: "Outstanding support! Highly recommended." },
    { id: 9, rating: 4, feedback: "Prompt response and excellent communication." },
    { id: 10, rating: 2, feedback: "Disappointed with the outcome." },
    { id: 11, rating: 5, feedback: "Impressed with the professionalism and expertise." },
    { id: 12, rating: 3, feedback: "Fair service, could be more attentive." },
    { id: 13, rating: 4, feedback: "Satisfactory experience overall." },
    { id: 14, rating: 2, feedback: "Poor communication and slow response time." },
    { id: 15, rating: 5, feedback: "Highly satisfied with the quality of service." },
    { id: 16, rating: 3, feedback: "Could improve on timeliness and accuracy." },
    { id: 17, rating: 4, feedback: "Professional and courteous staff." },
    { id: 18, rating: 2, feedback: "Below expectations in terms of service delivery." },
    { id: 19, rating: 5, feedback: "Exceeded expectations, would recommend to others." },
    { id: 20, rating: 4, feedback: "Good value for money, delivered as promised." },
    // Add more feedback data as needed
  ];

  return (
    <div style={{ backgroundColor: "#fafafa", padding: "20px" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h4" style={{ marginBottom: "16px", color: "#333" }}>Feedback</Typography>
        <div style={{ display: "table", width: "100%" }}>
          <div style={{ display: "table-header-group" }}>
            <div style={{ display: "table-row", backgroundColor: "#f5f5f5" }}>
              <div style={{ display: "table-cell", padding: "8px", fontWeight: "bold", color: "#555" }}>Rating</div>
              <div style={{ display: "table-cell", padding: "8px", fontWeight: "bold", color: "#555" }}>Feedback</div>
            </div>
          </div>
          <div style={{ display: "table-row-group" }}>
            {/* Render each feedback item */}
            {feedbackData.map((item) => (
              <div key={item.id} style={{ display: "table-row", backgroundColor: "#fff" }}>
                <div style={{ display: "table-cell", padding: "8px", borderBottom: "1px solid #eee", color: "#777" }}>{item.rating}</div>
                <div style={{ display: "table-cell", padding: "8px", borderBottom: "1px solid #eee", color: "#777" }}>{item.feedback}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultViewFeedback;
