import React from "react";
import Sidemenu from "../components/Sidemenu";

const Home = () => {
  return (
    <div className="home">
      <h2>Homepage</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="content">this is content</div>
      </div>
    </div>
  );
};

export default Home;
