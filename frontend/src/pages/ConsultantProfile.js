import React, { useEffect, useState } from "react";
import userImage from "../assest/profimage2.jpeg";
import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/sideMenu.css";

const ConsultantProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/consultant/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log("Team Profile", json);
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
                      <p>{pf.teamImage}</p>
                      <p>{pf.teamName}</p>
                      <p>{pf.email}</p>
                      <div className="team--members">
                        {pf.teamMembers.map((member) => (
                          <div className="team--member">
                            <p>{member.memberName}</p>
                            <p>{member.memberEmail}</p>
                            <p>{member.industryName}</p>
                            <p>{member.memberContactNo}</p>
                          </div>
                        ))}
                      </div>
                      <div className="team--projects">
                        {pf.projects.map((project) => (
                          <div className="team--project">
                            <p>{project.projectName}</p>
                            <p>{project.projectDescription}</p>
                          </div>
                        ))}
                      </div>
                      {/* <div className="team--achievment">
                            {pf.achievments.map((achievment) => (
                              <div className="team--achievment">
                                <p>{achievment.achievmentName}</p>
                                <p>{achievment.achievmentDescription}</p>
                              </div>
                            ))}
                          </div> */}
                      <div className="team--expertise">
                        {pf.expertise.map((expertise) => (
                          <div className="team--expertise">
                            <p>{expertise.expertiseName}</p>
                            <p>{expertise.expertiseDescription}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {pf.consultantType === "INDIVIDUAL" && (
                    <div className="profile--item">
                      <p>{pf.userName}</p>
                      <p>{pf.fullName}</p>
                      <p>{pf.email}</p>
                      <p>{pf.description}</p>
                      <p>{pf.achievements}</p>
                      <p>{pf.expertise}</p>
                      <p>{pf.projects}</p>
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
