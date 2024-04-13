import React, { useEffect, useState } from "react";
import {
  BiSearchAlt2,
  BiSolidBell,
  BiSolidBox,
  BiSolidCompass,
  BiSolidHome,
  BiSolidLocationPlus,
  BiSolidMessageAltDetail,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import user1 from "../assest/user.jpeg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const Menu = [];
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileCreateUrl, setProfileCreateUrl] = useState("");
  const [profileViewUrl, setProfileViewUrl] = useState("");

  const handleLogout = () => {
    setIsProfileCreated(false);
    logout();
  };

  useEffect(() => {
    const checkProfiles = async () => {
      let url = "";

      if (user.userType === "GENERAL") {
        url = "/api/profiles/general";
        setProfileCreateUrl("/general/create");
        setProfileViewUrl("/general/profile");
      } else if (user.userType === "BUSINESS") {
        url = "/api/profiles/business";
        setProfileCreateUrl("/business/create");
        setProfileViewUrl("/business/profile");
      } else if (user.userType === "COMPANY") {
        url = "/api/profiles/company";
        setProfileCreateUrl("/company/create");
        setProfileViewUrl("/company/profile");
      } else if (user.userType === "CONSULTANT") {
        url = "/api/profiles/consultant";
        setProfileCreateUrl("/consultant/create");
        setProfileViewUrl("/consultant/profile");
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      console.log(json);

      if (response.ok) {
        if (json.length > 0) {
          setIsProfileCreated(true);
        }
      }
    };

    if (user) {
      checkProfiles();
    }
  }, [user]);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="logo">ProfLink</h1>
          <p className="logo--icon">Your Professional Community</p>
        </Link>
        <div className="content--header">
          <div className="header--activity">
            <div className="search-box">
              <input type="text" placeholder="Search anything here.." />
              <BiSearchAlt2 className="icon1" />
            </div>
            <div className="home">
              <BiSolidHome className="icon" />
            </div>
            <div className="compass">
              <BiSolidCompass className="icon" />
            </div>
            <div className="message">
              <BiSolidMessageAltDetail className="icon" />
            </div>
            <div className="location">
              <BiSolidLocationPlus className="icon" />
            </div>
            <div className="search-jobbox">
              <BiSolidBox className="icon" />
            </div>
            <div className="notify">
              <BiSolidBell className="icon" />
            </div>
          </div>
        </div>
        <nav>
          {user && (
            <div className="profile-header">
              <img
                onClick={() => setOpen(!open)}
                src={user1}
                alt="user"
                className="profile-picture"
              />
              {open && (
                <div className="menu-items">
                  <span className="user-text">{user.email}</span>
                  {!isProfileCreated && (
                    <Link className="user-text" to={profileCreateUrl}>
                      Create Profile
                    </Link>
                  )}
                  {isProfileCreated && (
                    <Link className="user-text" to={profileViewUrl}>
                      My Profile
                    </Link>
                  )}
                  <Link
                    to={"/consultant/consultantdashboard"}
                    className="user-text"
                  >
                    Dashboard
                  </Link>
                  <Link className="user-text" to={"/consultant/createad"}>
                    Create Ad
                  </Link>
                  <Link className="logout-button" onClick={handleLogout}>
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className="login-container">
                Login
              </Link>
              <Link to="/signup" className="signup-container">
                Singup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
