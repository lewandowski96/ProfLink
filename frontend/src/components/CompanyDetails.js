import React from "react";

const CompanyDetails = ({ company }) => {
  return (
    <div className="company-details">
      <h4>{company.firstName}</h4>
      <p>
        <strong>{company.country}</strong>
      </p>
    </div>
  );
};

export default CompanyDetails;
