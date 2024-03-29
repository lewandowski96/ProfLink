import React from "react";
import { Link } from "react-router-dom";

const Sidemenu = () => {
  return (
    <div>
      <Link to="/companies">
        <h4>Companies</h4>
      </Link>
      <Link to="/business/list">
        <h4>Businesses Overview</h4>
      </Link>
      <Link to="/consultants">
        <h4>Consultants</h4>
      </Link>
      <div className="footer-links">
        <Link to="/aboutus">
          <p>About Us</p>
        </Link>
        <Link to="/help">
          <p>Help Center</p>
        </Link>
        <Link to="/privacy">
          <p>Privacy & Policy</p>
        </Link>
        <p>ProfLink @ 2024</p>
      </div>
    </div>
  );
};

export default Sidemenu;
