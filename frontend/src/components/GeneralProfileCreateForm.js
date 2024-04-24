import React, { useState } from "react";
import validator from "validator";
import { useAuthContext } from "../hooks/useAuthContext";

const GeneralProfileCreateForm = () => {
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
      industry: "IT",
    },
  ]);
  const [previousExperiences, setPreviousExperiences] = useState([
    { company: "", position: "", year: "", industry: "IT" },
  ]);
  const [skills, setSkills] = useState([{ name: "", level: "MEDIUM" }]);
  const [achievements, setAchievements] = useState([
    { name: "", multimedia: "", media_type: "DOCUMENT" },
  ]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      // industry: "",
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
      // level: "",
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
      // media_type: "",
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

    if (!validator.isEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!validator.isMobilePhone(contactNo)) {
      setError("Enter a valid phone number");
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

    const response = await fetch("/api/profiles/general", {
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
          industry: "IT",
        },
      ]);
      setPreviousExperiences([
        { company: "", position: "", year: "", industry: "IT" },
      ]);
      setSkills([{ name: "", level: "MEDIUM" }]);
      setAchievements([{ name: "", multimedia: "", media_type: "DOCUMENT" }]);
      setError(null);
      setEmptyFields([]);
      setSuccess("Profile saved successfully!");
      window.location.reload();
      console.log("profile saved", json);
    }
  };

  return (
    <form class="create" onSubmit={handleSubmit}>
      <h3>Create Your Profile!</h3>
      <label>Your First Name</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes("firstName") ? "error" : ""}
      />
      <label>Your Last Name</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes("lastName") ? "error" : ""}
      />
      <label>Your Date of Birth</label>
      <input
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth}
        className={emptyFields.includes("dateOfBirth") ? "error" : ""}
      />
      <label>Contact Number</label>
      <input
        type="number"
        onChange={(e) => setContactNo(e.target.value)}
        value={contactNo}
        className={emptyFields.includes("contactNo") ? "error" : ""}
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes("email") ? "error" : ""}
      />
      <label>Sex</label>
      <select
        id="sex"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        className={emptyFields.includes("sex") ? "error" : ""}
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <label>City</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={emptyFields.includes("city") ? "error" : ""}
      />
      <label>Country</label>
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
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>Schools Attended</h4>
      {schoolsAttended.map((school, index) => {
        return (
          <div key={index}>
            <label>School Name</label>
            <input
              name="schoolName"
              type="text"
              onChange={(e) => handleSchoolsAttended(e, index)}
              value={school.schoolName}
            />
            <label>Year</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handleSchoolsAttended(e, index)}
              value={school.year}
            />
            <button type="button" onClick={removeSchoolsAttended}>
              REMOVE
            </button>
            <br></br>
            <br></br>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addSchoolsAttended}>
        Add More..
      </button>
      <br></br>
      <br></br>
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>University Attended</h4>
      {universityAttended.map((university, index) => {
        return (
          <div key={index}>
            <label>University Name</label>
            <input
              name="universityName"
              type="text"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.universityName}
            />
            <label>Year</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.year}
            />
            <label>Degree</label>
            <input
              name="degree"
              type="text"
              onChange={(e) => handleUniversityAttended(e, index)}
              value={university.degree}
            />
          </div>
        );
      })}
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>Current Employment</h4>
      {currentEmployment.map((current, index) => {
        return (
          <div key={index}>
            <label>Company Name</label>
            <input
              name="company"
              type="text"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.company}
            />
            <label>Position</label>
            <input
              name="position"
              type="text"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.position}
            />
            {/* <label>Industry</label>
            <select
              id="industry"
              onChange={(e) => handleCurrentEmployment(e, index)}
              value={current.industry}
            >
              <option value="IT">Information Technology</option>
              <option value="BUSINESS">Business</option>
              <option value="TRANSPORTATION">Transportation</option>
              <option value="CONSTRUCTION">Construction</option>
              <option value="OTHER">Other</option>
            </select> */}
          </div>
        );
      })}
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>Previous Experiences</h4>
      {previousExperiences.map((company, index) => {
        return (
          <div key={index}>
            <label>Company Name</label>
            <input
              name="company"
              type="text"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.company}
            />
            <label>Position</label>
            <input
              name="position"
              type="text"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.position}
            />
            <label>Year</label>
            <input
              name="year"
              type="number"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.year}
            />
            {/* <label>Industry:</label>
            <select
              id="industry"
              onChange={(e) => handlePreviousExperiences(e, index)}
              value={company.industry}
            >
              <option value="IT">Information Technology</option>
              <option value="BUSINESS">Business</option>
              <option value="TRANSPORTATION">Transportation</option>
              <option value="CONSTRUCTION">Construction</option>
              <option value="OTHER">Other</option>
            </select> */}
            <button type="button" onClick={removePreviousExperiences}>
              REMOVE
            </button>
            <br></br>
            <br></br>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addPrevioudExperiences}>
        Add More..
      </button>
      <br></br>
      <br></br>
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>Skills</h4>
      {skills.map((skill, index) => {
        return (
          <div key={index}>
            <label>Skill Name</label>
            <input
              name="name"
              type="text"
              onChange={(e) => handleSkills(e, index)}
              value={skill.name}
            />
            {/* <label>Level:</label>
            <input
              name="level"
              type="text"
              onChange={(e) => handleSkills(e, index)}
              value={skill.level}
            />
            <select
              id="level"
              onChange={(e) => handleSkills(e, index)}
              value={skill.level}
            >
              <option value="LOW">Low</option>
              <option value="AVERAGE">Average</option>
              <option value="HIGH">High</option>
              <option value="EXPERT">Expert</option>
            </select> */}
            <button type="button" onClick={removeSkills}>
              REMOVE
            </button>
            <br></br>
            <br></br>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={addSkills}>
        Add More..
      </button>
      <br></br>
      <br></br>
      {/* <p>
        --------------------------------------------------------------------------------
      </p> */}
      <h4>Achievements</h4>
      {achievements.map((achievement, index) => {
        return (
          <div key={index}>
            <label>Name</label>
            <input
              name="name"
              type="text"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.name}
            />
            <label>Multimedia</label>
            <input
              name="multimedia"
              type="text"
              disabled
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.multimedia}
            />
            {/* <label>Media Type</label>
            <input
              name="media_type"
              type="text"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.media_type}
            />
            <select
              id="media_type"
              onChange={(e) => handleAchievements(e, index)}
              value={achievement.media_type}
            >
              <option value="DOCUMENT">Document</option>
              <option value="VIDEO">Video</option>
            </select> */}
            <button type="button" onClick={removeAchievements}>
              REMOVE
            </button>
            <br></br>
            <br></br>
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
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default GeneralProfileCreateForm;
