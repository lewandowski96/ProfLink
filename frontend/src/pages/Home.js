import React from "react";
import Sidemenu from "../components/Sidemenu";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="home">
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <Card/>
      </div>
    </div>
  );
};

export default Home;
