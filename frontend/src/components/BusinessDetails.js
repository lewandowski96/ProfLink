import React from "react";

const BusinessDetails = ({ business }) => {
  return (
    <div className="business-details">
      <h4>{business.firstName}</h4>
      <p>
        <strong>{business.country}</strong>
      </p>
    </div>
  );
};

export default BusinessDetails;
