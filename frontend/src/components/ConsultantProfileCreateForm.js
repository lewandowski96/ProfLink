import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConsultantProfileCreateForm = () => {
  return (
    <div>
      <p>Select type</p>
      <Link to="/consultant/individual/create">INDIVIDUAL</Link>
      <br></br>
      <Link to="/consultant/team/create">TEAM</Link>
    </div>
  );
};

export default ConsultantProfileCreateForm;
