import React from "react";

const ConsultantDetails = ({ consultant }) => {
  return (
    <div className="consultant-details">
      <h4>{consultant.firstName}</h4>
      <p>
        <strong>{consultant.country}</strong>
      </p>
    </div>
  );
};

export default ConsultantDetails;
