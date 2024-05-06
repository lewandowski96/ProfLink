import React from "react";
import { Link } from "react-router-dom";


const ConsultantProfileCreateForm = () => {
  return (
    <div className="container-profile">
      <div className="create-profile">
        
        <div className="indiviual">
        <Link to="/consultant/individual/create">INDIVIDUAL CONSULTANT</Link>
        </div>
        <div className="team">
        <Link to="/consultant/team/create">TEAM CONSULTANT</Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfileCreateForm;
