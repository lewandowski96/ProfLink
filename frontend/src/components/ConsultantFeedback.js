import React, { useState } from "react";
import { Button, Typography, Rating, Divider } from "@mui/material";
import Navbar from "./Navbar";
import ConsultViewFeedback from "./ConsultViewFeedback";
import { Link } from "react-router-dom";

const ConsultantFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
  };

  return (
    <div>
      <Navbar />
      <Link to="/consultant/viewfeddback"><Button variant="contained" style={{ marginLeft: "80%", marginRight: "0" ,marginTop: "10px"}}
          >View Feedback</Button></Link>
      <div className="feedback">
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        <h1>Give Your Feedback</h1>
      </Typography>
      <div style={{ marginBottom: "16px" }}>
        <Typography style={{ marginBottom: "8px" }}>Rate your experience:</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <Typography style={{ marginBottom: "8px" }}>Additional Feedback:</Typography>
        <textarea
          rows={5}
          cols={50}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ width: "100%", marginBottom: "16px" }}
      >
        Submit
      </Button>
    </div>
    </div>
    
    </div>
  );
};

export default ConsultantFeedback;