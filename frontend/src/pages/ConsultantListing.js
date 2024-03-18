import React, { useEffect, useState } from "react";
import ConsultantDetails from "../components/ConsultantDetails";

import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

const ConsultantListing = () => {
  const [indiConsultants, setIndiConsultants] = useState(null);
  const [teamConsultants, setTeamConsultants] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchIndiConsultants = async () => {
      const response = await fetch("/api/profiles/consultant/individual/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setIndiConsultants(json);
      }
    };

    const fetchTeamConsultants = async () => {
      const response = await fetch("/api/profiles/consultant/team/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setTeamConsultants(json);
      }
    };

    if (user) {
      fetchIndiConsultants();
      fetchTeamConsultants();
    }
  }, [user]);

  return (
    <div className="consultant-listing">
      <h2>Consultants</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="consultants">
          <div className="indi-consultants">
            <h4>Individual Consultants</h4>
            {indiConsultants &&
              indiConsultants.map((consultant) => (
                <ConsultantDetails
                  key={consultant._id}
                  consultant={consultant}
                />
              ))}
          </div>
          <div className="team-consultants">
            <h4>Team Consultants</h4>
            {teamConsultants &&
              teamConsultants.map((consultant) => (
                <ConsultantDetails
                  key={consultant._id}
                  consultant={consultant}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantListing;
