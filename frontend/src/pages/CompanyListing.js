import React, { useEffect, useState } from "react";

import CompanyDetails from "../components/CompanyDetails";
import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

const CompanyListing = () => {
  const [companies, setCompanies] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/profiles/company/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCompanies(json);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [user]);

  return (
    <div className="company-listing">
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="companies">
          {companies &&
            companies.map((company) => (
              <CompanyDetails key={company._id} company={company} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyListing;
