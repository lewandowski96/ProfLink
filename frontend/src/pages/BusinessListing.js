import React from "react";


// components
import Sidemenu from "../components/Sidemenu";

const BusinessListing = () => { 

  return (
    <div className="business-listing">
      <h2>Businesses</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="businesses"> 
        </div>
      </div>
    </div>
  );
};

export default BusinessListing;
