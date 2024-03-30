import React, { useEffect, useState } from "react";

import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

import formatISO from "date-fns/formatISO";

const GeneralProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/general/", {
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
    <div className="view-general-profile">
      <h2>Your Profile</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="general-profile">
          <div className="bio">
            {/* <span className="material-symbols-outlined">person</span> */}
            <img src="/prof_pic_placeholder.png" width={"200px"} alt="dsd" />
            <div className="bio-details">
              {profile &&
                profile.map((pf) => (
                  <>
                    <h4>
                      {pf.firstName} {pf.lastName}
                    </h4>
                    <p>{pf.currentEmployment[0].position}</p>
                    <p>{pf.bio}</p>
                  </>
                ))}
            </div>
          </div>
          {/* <div>
            <br></br>
          </div> */}
          <div className="row-1">
            <div className="personal-section">
              <h4>PERSONAL</h4>
              <div className="personal-section-details">
                {profile &&
                  profile.map((pf) => (
                    <>
                      <p>
                        Date Of Birth -{" "}
                        {formatISO(new Date(pf.dateOfBirth), {
                          representation: "date",
                        })}
                      </p>
                      <p>Contact - {pf.contactNo}</p>
                      <p>Email - {pf.email}</p>
                      <p>City - {pf.city}</p>
                      <p>Country - {pf.country}</p>
                    </>
                  ))}
              </div>
            </div>
            <div className="skills-section">
              <h4>SKILLS</h4>
              <div className="skills-section-details">
                {profile &&
                  profile.map((pf) => (
                    <>
                      {pf.skills.length > 1 &&
                        pf.skills.map((skill) => (
                          <p>
                            {skill.name} - {skill.level}
                          </p>
                        ))}
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="education-section">
              <h4>EDUCATION</h4>
              <div className="education-section-details">
                <h4>Schools</h4>
                {profile &&
                  profile.map((pf) => (
                    <>
                      {pf.schoolsAttended.map((school) => (
                        <div className="school-details">
                          <p>{school.schoolName}</p>
                          <p>{school.year}</p>
                        </div>
                      ))}
                    </>
                  ))}
                <h4>University</h4>
                {profile &&
                  profile.map((pf) => (
                    <>
                      {pf.universityAttended.map((university) => (
                        <div className="school-details">
                          <p>{university.universityName}</p>
                          <p>{university.year}</p>
                          <p>{university.degree}</p>
                        </div>
                      ))}
                    </>
                  ))}
              </div>
            </div>
            <div className="achievements-section">
              <h4>ACHIEVEMENTS</h4>
              <div className="achievements-section-details">
                {profile &&
                  profile.map((pf) => (
                    <>
                      {pf.achievements.map((achievement) => (
                        <div className="school-details">
                          <p>{achievement.name}</p>
                        </div>
                      ))}
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="work-section">
              <h4>WORK EXPERIENCE</h4>
              <div className="work-section-details">
                {profile &&
                  profile.map((pf) => (
                    <>
                      {pf.previousExperiences.length > 1 &&
                        pf.previousExperiences.map((experience) => (
                          <div className="school-details">
                            <h4>{experience.company}</h4>
                            <p>
                              Worked as a {experience.position} at{" "}
                              {experience.year}
                            </p>
                          </div>
                        ))}
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralProfile;
