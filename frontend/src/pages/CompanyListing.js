import React, { useEffect, useState } from "react";

import CompanyDetails from "../components/CompanyDetails";

const CompanyListing = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/profiles/company/all");
      const json = await response.json();

      if (response.ok) {
        setCompanies(json);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <h2>Companies</h2>
      <div className="company-listing">
        <div className="companies">
          {companies &&
            companies.map((company) => (
              <CompanyDetails key={company._id} company={company} />
            ))}
        </div>
      </div>
    </>
  );
};

export default CompanyListing;
