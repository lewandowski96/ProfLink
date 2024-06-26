import React, { useEffect, useState } from "react";

import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

const BusinessProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/business/", {
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
    <div className="view-business-profile">
      <h2>Your Business Profile</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="business-profile">
          {/* <span className="material-symbols-outlined">person</span> */}
          <img
            src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/321303108_645706393959633_5173741171479257555_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U0Ui1Cj2tm4AX_GpsLr&_nc_ht=scontent.fcmb2-2.fna&oh=00_AfAgIkBSPgchn0AePI1ji4pXwdxViBpInnshoQ8iiWGD9A&oe=65FDB6A6"
            width={"200px"}
            alt="dsd"
          />
          {profile &&
            profile.map((pf) => (
              <div>
                <p>{pf.firstName}</p>
                <p>{pf.lastName}</p>
                <p>{pf.country}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
