import React from "react";

const ConsultantDetails = ({ consultant }) => {
  return (
    <div className="consultant-details">
      <h4>{consultant.userName}</h4>
      <p>
        <strong>{consultant.email}</strong>
      </p>
    </div>
  );
};

export default ConsultantDetails;
