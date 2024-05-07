import React, { useEffect, useState } from "react";
import userImage from "../assest/profimage2.jpeg";
import Sidemenu from "../components/Sidemenu";
import "../styles/sideMenu.css";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";

const ConsultantProfile = () => {
  const [profile, setProfile] = useState(null);
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/consultant/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setProfile(json);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="view-consultant-profile">
      <h2>Your Consultant Profile</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="consultant-profile">
          <div className="image-container">
            {/* <span className="material-symbols-outlined">person</span> */}
            <img src={userImage} alt="userimage" className="userImage" />
          </div>
          <div className="profile--cover">
            {profile &&
              profile.map((pf) => (
                <div>
                  {pf.consultantType === "TEAM" && (
                    <div className="profile--item">
                      <p>{pf.fullName}</p>
                      <p>{pf.teamImage}</p>
                      <p>{pf.email}</p>
                      <p>{pf.teamName}</p>
                      <p>{pf.teamDescription}</p>
                    </div>
                  )}
                  {pf.consultantType === "INDIVIDUAL" && (
                    <div className="profile--item">
                      <p>{pf.userName}</p>
                      <p>{pf.fullName}</p>
                      <p>{pf.email}</p>
                      <p>{pf.description}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
