import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

const ConsultantIndividualProfileCreateForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    contactNo: "",
    yourLocation: "",
    yourSelf: "",
    schoolsUniversityAttended: [
      {
        universityName: "",
        year: "",
        degree: "",
        fieldOfStudy: "",
        description: "",
      },
    ],
    workExperience: [
      {
        nameOfPosition: "",
        companyName: "",
        startDate: "",
        endDate: "",
        industryName: "",
      },
    ],
    skills: [{ AddSkills: "" }],
    achievements: [{ achievementsName: "", achievementsDescription: "" }],
    Project: [{ ProjectName: "", ProjectDescription: "" }],
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [userName, setUserName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [yourLocation, setYourLocation] = useState("");
  const [yourSelf, setYourSelf] = useState("");
  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "" },
  ]);
  const [schoolsUniversityAttended, setschoolsUniversityAttended] = useState([
    {
      universityName: "",
      year: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
    },
  ]);
  const [workExperience, setWorkExperience] = useState([
    {
      nameOfPosition: "",
      companyName: "",
      startDate: "",
      endDate: "",
      industryName: "",
    },
  ]);
  const [skills, setSkills] = useState([{ AddSkills: "" }]);
  const [achievements, setAchievements] = useState([
    { achievementsName: "", achievementsDescription: "" },
  ]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);

  const handleSchoolsAttended = (e, index) => {
    console.log(index, e.target.name);
    let data = [...schoolsUniversityAttended];
    data[index][e.target.name] = e.target.value;
    setschoolsUniversityAttended(data);
  };

  const addSchoolsAttended = () => {
    let newUniversity = {
      UniversityName: "",
      year: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
    };
    setschoolsUniversityAttended([...schoolsUniversityAttended, newUniversity]);
  };

  const removeSchoolsAttended = (index) => {
    let data = [...schoolsUniversityAttended];
    data.splice(index, 1);
    setschoolsUniversityAttended(data);
  };

  const handleWorkExperience = (e, index) => {
    console.log(index, e.target.name);
    let data = [...workExperience];
    data[index][e.target.name] = e.target.value;
    setWorkExperience(data);
  };

  const addWorkExperience = () => {
    let newWorkExperience = {
      nameOfPosition: "",
      companyName: "",
      startDate: "",
      endDate: "",
      industryName: "",
    };
    setWorkExperience([...workExperience, newWorkExperience]);
  };

  const removeWorkExperience = (index) => {
    let data = [...workExperience];
    data.splice(index, 1);
    setWorkExperience(data);
  };

  const handleSkills = (e, index) => {
    console.log(index, e.target.name);
    let data = [...skills];
    data[index][e.target.name] = e.target.value;
    setSkills(data);
  };

  const addSkills = () => {
    let newSkill = {
      AddSkills: "",
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
      achievementsName: "",
      achievementsDescription: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievements = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setAchievements(data);
  };

  const handleProject = (e, index) => {
    console.log(index, e.target.name);
    let data = [...projects];
    data[index][e.target.name] = e.target.value;
    setProjects(data);
  };

  const addProject = () => {
    let newProject = {
      projectName: "",
      projectDescription: "",
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (index) => {
    let data = [...projects];
    data.splice(index, 1);
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("comes here to submit");

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isContactNoValid = validateContactNo();

    if (isFullNameValid && isEmailValid && isContactNoValid) {
      const data = {
        fullName,
        userName,
        email,
        contactNo,
        yourLocation,
        yourSelf,
        schoolsUniversityAttended,
        workExperience,
        addSkills,
        skills,
        achievements,
        projects,
      };

      console.log("individual cons data", data);

      const response = await fetch("/api/profiles/consultant/individual", {
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
        setFullName("");
        setUserName("");
        setEmail("");
        setContactNo("");
        setYourLocation("");
        setYourSelf("");
        setschoolsUniversityAttended([
          {
            universityName: "",
            year: "",
            degree: "",
            fieldOfStudy: "",
            description: "",
          },
        ]);
        setWorkExperience([
          {
            nameOfPosition: "",
            companyName: "",
            startDate: "",
            endDate: "",
            industryName: "",
          },
        ]);
        setSkills([{ AddSkills: "" }]);
        setAchievements([
          { achievementsName: "", achievementsDescription: "" },
        ]);
        setProjects([{ projectName: "", projectDescription: "" }]);

        setError(null);
        setEmptyFields([]);
        console.log("profile saved", json);
      }
    }
  };

  const handleSave = () => {
    if (activeTab === "personal") {
      if (fullName === "") {
        setError("Please enter your full name");
        return;
      }
      if (!email.trim()) {
        setError("Please enter your email");
        return;
      }
      if (!contactNo.trim()) {
        setError("Please enter your contact number");
        return;
      }
    } else if (activeTab === "work") {
      // Example validation for work tab
      if (
        workExperience.some(
          (work) => !work.nameOfPosition.trim() || !work.companyName.trim()
        )
      ) {
        setError("Please fill in all work experience fields");
        return;
      }
    }
  };

  const getNextTab = () => {
    const tabs = [
      "personal",
      "education",
      "work",
      "skills",
      "achievements",
      "Project",
    ];
    const currentTabIndex = tabs.indexOf(activeTab);
    if (currentTabIndex < tabs.length - 1) {
      return tabs[currentTabIndex + 1];
    }
    return null;
  };

  /* setFormData is used to update the form data state object. */
  const setFormValues = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  /*validation for the form fields*/
  const validateFullName = () => {
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      return false;
    }
    setFullNameError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateContactNo = () => {
    if (!contactNo.trim()) {
      setContactNoError("Contact number is required");
      return false;
    }
    setContactNoError("");
    return true;
  };

  return (
    <>
      <Navbar />
      <Box p="1rem 0" sx={{ background: "#DDE6ED" }}></Box>
      <div className="individual-header">
        {/*Tab navigation*/}
        <div className="tab-navigation">
          <button onClick={() => handleTabChange("personal")}>Personal</button>
          <button onClick={() => handleTabChange("education")}>
            Education
          </button>
          <button onClick={() => handleTabChange("work")}>
            Work Experience
          </button>
          <button onClick={() => handleTabChange("skills")}>Skills</button>
          <button onClick={() => handleTabChange("achievements")}>
            Achievements
          </button>
          <button onClick={() => handleTabChange("Project")}>Project</button>
        </div>

        <form class="create" onSubmit={handleSubmit} className="form-container">
          {activeTab === "personal" && (
            <div>
              {/* <label>Personal</label> */}

              <label>Your Full Name:</label>
              <input
                placeholder="Enter your full name"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className={emptyFields.includes("fullName") ? "error" : ""}
              />
              <label>Your User Name:</label>
              <input
                placeholder="Enter your username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className={emptyFields.includes("userName") ? "error" : ""}
              />
              <label>Email:</label>
              <input
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes("email") ? "error" : ""}
              />
              <label>Contact No:</label>
              <input
                placeholder="Enter your contact number"
                type="text"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                className={emptyFields.includes("contactNo") ? "error" : ""}
              />
              <label>Your Location:</label>
              <input
                placeholder="Enter your location"
                type="text"
                onChange={(e) => setYourLocation(e.target.value)}
                value={yourLocation}
                className={emptyFields.includes("yourLocation") ? "error" : ""}
              />
              <label>Your Self:</label>
              <input
                placeholder="Enter about yourself"
                type="text"
                onChange={(e) => setYourSelf(e.target.value)}
                value={yourSelf}
                className={emptyFields.includes("yourSelf") ? "error" : ""}
              />
              <button type="button" onClick={handleSave}>
                {" "}
                Save{" "}
              </button>
              {error && <div className="error">{error}</div>}
            </div>
          )}
          {activeTab === "education" && (
            <div>
              {/* <label>Education</label> */}
              {schoolsUniversityAttended.map((school, index) => {
                return (
                  <div key={index}>
                    <label>University Name:</label>
                    <input
                      placeholder="Enter your university name"
                      name="universityName"
                      type="text"
                      onChange={(e) => handleSchoolsAttended(e, index)}
                      value={school.universityName}
                    />
                    <label>Year:</label>
                    <input
                      placeholder="Enter your joind year"
                      name="year"
                      type="text"
                      onChange={(e) => handleSchoolsAttended(e, index)}
                      value={school.year}
                    />
                    <label>Degree:</label>
                    <input
                      placeholder="Enter your degree ex: Bsc in IT"
                      name="degree"
                      type="text"
                      onChange={(e) => handleSchoolsAttended(e, index)}
                      value={school.degree}
                    />
                    <label>Field of Study:</label>
                    <input
                      placeholder="Enter your field of study"
                      name="fieldOfStudy"
                      type="text"
                      onChange={(e) => handleSchoolsAttended(e, index)}
                      value={school.fieldOfStudy}
                    />
                    <label>Description:</label>
                    <input
                      placeholder="Enter your description"
                      name="description"
                      type="text"
                      onChange={(e) => handleSchoolsAttended(e, index)}
                      value={school.description}
                    />
                    <button className="icon" type="button" onClick={handleSave}>
                      {" "}
                      Save{" "}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button
                      className="icon"
                      type="button"
                      onClick={() => removeSchoolsAttended(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button
                className="icon"
                type="button"
                onClick={addSchoolsAttended}
              >
                Add Education
              </button>
            </div>
          )}
          {activeTab === "work" && (
            <div>
              {/* <label>Work Experience</label> */}
              {workExperience.map((work, index) => {
                return (
                  <div key={index}>
                    <label>Name of Position:</label>
                    <input
                      placeholder="Enter your position name ex: Software Engineer"
                      name="nameOfPosition"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.nameOfPosition}
                    />
                    <label>Company Name:</label>
                    <input
                      placeholder="Enter your company name"
                      name="companyName"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.companyName}
                    />
                    <label>Start Date:</label>
                    <input
                      placeholder="Enter your first joind date"
                      name="startDate"
                      type="date"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.startDate}
                    />
                    <label>End Date:</label>
                    <input
                      placeholder="Enter your resign date"
                      name="endDate"
                      type="date"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.endDate}
                    />
                    <label>Industry Name:</label>
                    <input
                      placeholder="Enter your industry name ex: IT"
                      name="industryName"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.industryName}
                    />
                    <button type="button" onClick={handleSave}>
                      {" "}
                      Save{" "}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addWorkExperience}>
                Add Work Experience
              </button>
            </div>
          )}
          {activeTab === "skills" && (
            <div>
              {/* <label>Skills</label> */}
              <label>Select your Programming Skills</label>
              <select>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c#">C#</option>
                <option value="mysql">mySql</option>
              </select>
              <label>Select your Language Skills</label>
              <select>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="sinhala">Sinhala</option>
                <option value="french">French</option>
              </select>
              {skills.map((skill, index) => {
                return (
                  <div key={index}>
                    <label>Skill:</label>
                    <input
                      placeholder="Enter your skill"
                      name="AddSkills"
                      type="text"
                      onChange={(e) => handleSkills(e, index)}
                      value={skill.AddSkills}
                    />
                    <button type="button" onClick={handleSave}>
                      {" "}
                      Save{" "}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button type="button" onClick={() => removeSkills(index)}>
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addSkills}>
                Add Skills
              </button>
            </div>
          )}
          {activeTab === "achievements" && (
            <div>
              {/* <label>Achievements</label> */}
              {achievements.map((achievement, index) => {
                return (
                  <div key={index}>
                    <label>Name:</label>
                    <input
                      placeholder="Enter your achievement ex: Best Employee of the year"
                      name="achievementsName"
                      type="text"
                      onChange={(e) => handleAchievements(e, index)}
                      value={achievement.achievementsName}
                    />
                    <label>Description:</label>
                    <input
                      placeholder="Enter your achievement description"
                      name="achievementsDescription"
                      type="text"
                      onChange={(e) => handleAchievements(e, index)}
                      value={achievement.achievementsDescription}
                    />
                    <label>Images/Videos</label>
                    <div className="form-image">
                      {achievement.image && (
                        <img src={achievement.image} alt="member" width="100" />
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleAchievements(e, index)}
                      />
                    </div>
                    <button type="button" onClick={handleSave}>
                      {" "}
                      Save{" "}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button
                      type="button"
                      onClick={() => removeAchievements(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addAchievements}>
                Add Achievements
              </button>
            </div>
          )}
          {activeTab === "Project" && (
            <div>
              {/* <label>Project</label> */}
              {projects.map((project, index) => {
                return (
                  <div key={index}>
                    <label>Project Name:</label>
                    <input
                      placeholder="Enter your project name ex: Online Shopping System"
                      name="projectName"
                      type="text"
                      onChange={(e) => handleProject(e, index)}
                      value={project.projectName}
                    />
                    <label>Project Description:</label>
                    <input
                      placeholder="Enter your project description"
                      name="projectDescription"
                      type="text"
                      onChange={(e) => handleProject(e, index)}
                      value={project.projectDescription}
                    />
                    <label>Images/Videos</label>
                    <div className="form-image">
                      {project.image && (
                        <img src={project.image} alt="member" width="100" />
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleProject(e, index)}
                      />
                    </div>
                    <button type="button" onClick={() => removeProject(index)}>
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addProject}>
                Add Project
              </button>
              <br></br>
              <br></br>
              <button type="submit">CREATE PROFILE</button>
              {error && <div className="error">{error}</div>}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ConsultantIndividualProfileCreateForm;
