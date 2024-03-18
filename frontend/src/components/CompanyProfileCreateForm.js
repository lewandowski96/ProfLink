import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CompanyProfileCreateForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [schoolsAttended, setSchoolsAttended] = useState([
    { schoolName: "", year: "" },
  ]);
  const [universityAttended, setUniversityAttended] = useState([
    {
      universityName: "",
      year: "",
      degree: "",
    },
  ]);
  const [currentEmployment, setCurrentEmployment] = useState([
    {
      company: "",
      position: "",
      industry: "",
    },
  ]);
  const [previousExperiences, setPreviousExperiences] = useState([
    { company: "", position: "", year: "", industry: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "", level: "" }]);
  const [achievements, setAchievements] = useState([
    { name: "", multimedia: "", media_type: "" },
  ]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSchoolsAttended = (e, index) => {
    console.log(index, e.target.name);
    let data = [...schoolsAttended];
    data[index][e.target.name] = e.target.value;
    setSchoolsAttended(data);
  };

  const addSchoolsAttended = () => {
    let newSchool = {
      schoolName: "",
      year: "",
    };
    setSchoolsAttended([...schoolsAttended, newSchool]);
  };

  const removeSchoolsAttended = (index) => {
    let data = [...schoolsAttended];
    data.splice(index, 1);
    setSchoolsAttended(data);
  };

  const handleUniversityAttended = (e, index) => {
    let data = [...universityAttended];
    data[index][e.target.name] = e.target.value;
    setUniversityAttended(data);
  };

  const handleCurrentEmployment = (e, index) => {
    let data = [...currentEmployment];
    data[index][e.target.name] = e.target.value;
    setCurrentEmployment(data);
  };

  const handlePreviousExperiences = (e, index) => {
    console.log(index, e.target.name);
    let data = [...previousExperiences];
    data[index][e.target.name] = e.target.value;
    setPreviousExperiences(data);
  };

  const addPrevioudExperiences = () => {
    let newExperience = {
      company: "",
      position: "",
      year: "",
      industry: "",
    };
    setPreviousExperiences([...previousExperiences, newExperience]);
  };

  const removePreviousExperiences = (index) => {
    let data = [...previousExperiences];
    data.splice(index, 1);
    setPreviousExperiences(data);
  };

  const handleSkills = (e, index) => {
    console.log(index, e.target.name);
    let data = [...skills];
    data[index][e.target.name] = e.target.value;
    setSkills(data);
  };

  const addSkills = () => {
    let newSkill = {
      name: "",
      level: "",
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkills = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setSkills(data);
  };

  const handleAchievements = (e, index) => {
    console.log(index, e.target.name);
    let data = [...achievements];
    data[index][e.target.name] = e.target.value;
    setAchievements(data);
  };

  const addAchievements = () => {
    let newAchievement = {
      name: "",
      multimedia: "",
      media_type: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievements = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setAchievements(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const data = {
      firstName,
      lastName,
      dateOfBirth,
      contactNo,
      email,
      sex,
      city,
      country,
      bio,
      schoolsAttended,
      universityAttended,
      currentEmployment,
      previousExperiences,
      skills,
      achievements,
    };

    console.log(data);

    const response = await fetch("/api/profiles/company", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setContactNo("");
      setCity("");
      setCountry("");
      setEmail("");
      setSex("");
      setBio("");
      setSchoolsAttended([{ schoolName: "", year: "" }]);
      setUniversityAttended([
        {
          universityName: "",
          year: "",
          degree: "",
        },
      ]);
      setCurrentEmployment([
        {
          company: "",
          position: "",
          industry: "",
        },
      ]);
      setPreviousExperiences([
        { company: "", position: "", year: "", industry: "" },
      ]);
      setSkills([{ name: "", level: "" }]);
      setAchievements([{ name: "", multimedia: "", media_type: "" }]);
      setError(null);
      setEmptyFields([]);
      console.log("profile saved", json);
    }
  };

  return (
    <form class="create" onSubmit={handleSubmit}>
      <h3>Create Your Company Profile!</h3>
      <label>Your First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes("firstName") ? "error" : ""}
      />
      <label>Your Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes("lastName") ? "error" : ""}
      />
      <label>Your DOB:</label>
      <input
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth}
        className={emptyFields.includes("dateOfBirth") ? "error" : ""}
      />
      <label>Contact No:</label>
      <input
        type="text"
        onChange={(e) => setContactNo(e.target.value)}
        value={contactNo}
        className={emptyFields.includes("contactNo") ? "error" : ""}
      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes("email") ? "error" : ""}
      />
      <label>Sex:</label>
      <input
        type="text"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        className={emptyFields.includes("sex") ? "error" : ""}
      />
      <label>City:</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={emptyFields.includes("city") ? "error" : ""}
      />
      <label>Country:</label>
      <input
        type="text"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        className={emptyFields.includes("country") ? "error" : ""}
      />
      <label>Bio:</label>
      <input
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        className={emptyFields.includes("bio") ? "error" : ""}
      />
      <label>Schools Attended:</label>
      {schoolsAttended.map((school, index) => {
        return (
          <div key={index}>
            <label>School Name:</label>
            <input
              name="schoolName"
              type="text"
              onChange={(e) => handleSchoolsAttended(e, index)}
              value={school.schoolName}
            />
            <label>Year:</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handleSchoolsAttended(e, index)}
              value={school.year}
            />
            <button type="button" onClick={removeSchoolsAttended}>
              REMOVE
            </button>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addSchoolsAttended}>
        Add More..
      </button>
      <br></br>
      <br></br>
      <label>University Attended:</label>
      {universityAttended.map((university, index) => {
        return (
          <div key={index}>
            <label>University Name:</label>
            <input
              name="universityName"
              type="text"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.universityName}
            />
            <label>Year:</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.year}
            />
            <label>Degree:</label>
            <input
              name="degree"
              type="text"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.degree}
            />
          </div>
        );
      })}
      <label>Current Employment:</label>
      {currentEmployment.map((current, index) => {
        return (
          <div key={index}>
            <label>Company Name:</label>
            <input
              name="company"
              type="text"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.company}
            />
            <label>Year:</label>
            <input
              name="position"
              type="text"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.position}
            />
            <label>Industry:</label>
            <input
              name="industry"
              type="text"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.industry}
            />
          </div>
        );
      })}
      <label>Previous Experiences:</label>
      {previousExperiences.map((company, index) => {
        return (
          <div key={index}>
            <label>Company Name:</label>
            <input
              name="company"
              type="text"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.company}
            />
            <label>Position:</label>
            <input
              name="position"
              type="text"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.position}
            />
            <label>Year:</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.year}
            />
            <label>Industry:</label>
            <input
              name="industry"
              type="text"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.industry}
            />
            <button type="button" onClick={removePreviousExperiences}>
              REMOVE
            </button>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addPrevioudExperiences}>
        Add More..
      </button>
      <br></br>
      <br></br>
      <label>Skills:</label>
      {skills.map((skill, index) => {
        return (
          <div key={index}>
            <label>Skill Name:</label>
            <input
              name="name"
              type="text"
              onChange={(e) => handleSkills(e, index)}
              value={skill.name}
            />
            <label>Level:</label>
            <input
              name="level"
              type="text"
              onChange={(e) => handleSkills(e, index)}
              value={skill.level}
            />
            <button type="button" onClick={removeSkills}>
              REMOVE
            </button>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addSkills}>
        Add More..
      </button>
      <br></br>
      <br></br>
      <label>Achievements:</label>
      {achievements.map((achievement, index) => {
        return (
          <div key={index}>
            <label>Name:</label>
            <input
              name="name"
              type="text"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.name}
            />
            <label>Multimedia:</label>
            <input
              name="multimedia"
              type="text"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.multimedia}
            />
            <label>Media Type:</label>
            <input
              name="media_type"
              type="text"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.media_type}
            />
            <button type="button" onClick={removeAchievements}>
              REMOVE
            </button>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addAchievements}>
        Add More..
      </button>
      <br></br>
      <br></br>
      <button type="submit">CREATE PROFILE!</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CompanyProfileCreateForm;
