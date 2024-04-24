import React, { useEffect, useState } from "react";

import BusinessDetails from "../components/BusinessDetails";
import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

const BusinessListing = () => {
  const [businesses, setBusinesses] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await fetch("/api/profiles/business/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setBusinesses(json);
      }
    };

    if (user) {
      fetchBusinesses();
    }
  }, [user]);

  return (
    <div className="business-listing">
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="businesses">
          {businesses &&
            businesses.map((business) => (
              <BusinessDetails key={business._id} business={business} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessListing;
