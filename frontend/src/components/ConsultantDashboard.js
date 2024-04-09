import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const ConsultantDashboard = () => {

  return (
  <div className="container-profile">
  <div className="create-dashboard">
    
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Post impression</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Followers</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Profile Viewer</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Client Feedback</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Search Appearance</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Project</Link>
    </div>
    <div className="dashboard-contaioner">
    <Link to="/consultant/consultantdashboard">Advertisement</Link>
    </div>
  </div>
</div>
);
};

export default ConsultantDashboard;