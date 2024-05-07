import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

const ConsultantTeamProfileCreateForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Addmember: "",
    contactNo: "",
    achievements: [{ achievementsName: "", achievementsDescription: "" }],
    projects: [{ projectName: "", projectDescription: "" }],
    expertise: [{ expertiseField: "", describeExpertise: "" }],
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [Addmember, setAddmember] = useState([
    { memberName: "", memberEmail: "", memberContactNo: "" },
  ]);
  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "" },
  ]);
  const [expertise, setExpertise] = useState([
    { expertiseField: "", describeExpertise: "" },
  ]);
  const [achievements, setAchievements] = useState([
    { achievementsName: "", achievementsDescription: "" },
  ]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);

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
    let data = [...achievements];
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

  const handleExpertise = (e, index) => {
    console.log(index, e.target.name);
    let data = [...expertise];
    data[index][e.target.name] = e.target.value;
    setExpertise(data);
  };

  const addExpertise = () => {
    let newExpertise = {
      expertiseField: "",
      describeExpertise: "",
    };
    setExpertise([...expertise, newExpertise]);
  };

  const removeExpertise = (index) => {
    let data = [...expertise];
    data.splice(index, 1);
    setExpertise(data);
  };

  const handleAddmember = (e, index) => {
    console.log(index, e.target.name);
    let data = [...Addmember];
    data[index][e.target.name] = e.target.value;
    setAddmember(data);
  };

  const addAddmember = () => {
    let newAddmember = {
      memberName: "",
      memberEmail: "",
      memberContactNo: "",
    };
    setAddmember([...Addmember, newAddmember]);
  };

  const removeAddmember = (index) => {
    let data = [...Addmember];
    data.splice(index, 1);
    setAddmember(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isContactNoValid = validateContactNo();

    if (isFullNameValid && isEmailValid && isContactNoValid) {
      const data = {
        fullName,
        email,
        Addmember,
        contactNo,
        projects,
        achievements,
        expertise,
      };

      console.log(data);

      const response = await fetch("/api/profiles/consultant/team", {
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
        setEmail("");
        setAddmember([
          { memberName: "", memberEmail: "", memberContactNo: "" },
        ]);
        setContactNo("");
        setAchievements([
          { achievementsName: "", achievementsDescription: "" },
        ]);
        setProjects([{ projectName: "", projectDescription: "" }]);
        setExpertise([{ expertiseField: "", describeExpertise: "" }]);
      }

      setError(null);
      setEmptyFields([]);
      console.log("profile saved", json);
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
    } else if (activeTab === "achievements") {
      if (achievements.achievementsName === "") {
        setError("Please enter your achievement name");
        return;
      }
      if (achievements.achievementsDescription === "") {
        setError("Please enter your achievement description");
        return;
      }
    } else if (activeTab === "expertise") {
      if (expertise.expertiseField === "") {
        setError("Please enter your expertise field");
        return;
      }
      if (expertise.describeExpertise === "") {
        setError("Please enter your expertise description");
        return;
      }
    } else if (activeTab === "Project") {
      if (projects.ProjectName === "") {
        setError("Please enter your project name");
        return;
      }
      if (projects.ProjectDescription === "") {
        setError("Please enter your project description");
        return;
      }
    } else {
      setError(null);
    }
    const nextTab = getNextTab();
    if (nextTab) {
      setActiveTab(nextTab);
      setError(null);
    }
  };

  function getNextTab() {
    const tabs = ["personal", "achievements", "expertise", "Project"];
    const currentTabIndex = tabs.indexOf(activeTab);
    if (currentTabIndex < tabs.length - 1) {
      return tabs[currentTabIndex + 1];
    }
    return null;
  }

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
      <div className="team-header">
        {/*Tab navigation*/}
        <div className="tab-navigation">
          <button onClick={() => handleTabChange("personal")}>
            Team Members
          </button>
          {/* <button onClick={() => handleTabChange("work")}>Work Experience</button> */}
          {/* <button onClick={() => handleTabChange("skills")}>Skills</button> */}
          <button onClick={() => handleTabChange("achievements")}>
            Achievements
          </button>
          <button onClick={() => handleTabChange("expertise")}>
            Expertise
          </button>
          <button onClick={() => handleTabChange("Project")}>Project</button>
        </div>
        {/*Form*/}
        <form class="create" onSubmit={handleSubmit} className="form-container">
          {activeTab === "personal" && (
            <div>
              <label>Teame Name:</label>
              <input
                placeholder="Enter your team name"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className={emptyFields.includes("fullName") ? "error" : ""}
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
            </div>
          )}
          {activeTab === "personal" && (
            <div>
              <br></br>
              <h3>Add Team Members</h3>
              {Addmember.map((member, index) => {
                return (
                  <div key={index}>
                    <label>Member Name:</label>
                    <input
                      placeholder="Enter member name"
                      name="memberName"
                      type="text"
                      onChange={(e) => handleAddmember(e, index)}
                      value={member.memberName}
                    />
                    <label>Member Email:</label>
                    <input
                      placeholder="Enter member email"
                      name="memberEmail"
                      type="text"
                      onChange={(e) => handleAddmember(e, index)}
                      value={member.memberEmail}
                    />
                    <label>Industry Name</label>
                    <input
                      placeholder="Enter memeber field of industry ex:Software Engineer"
                      name="industryName"
                      type="text"
                      onChange={(e) => handleAddmember(e, index)}
                      value={member.industryName}
                    />
                    <label>Member Contact No:</label>
                    <input
                      placeholder="Enter member contact number"
                      name="memberContactNo"
                      type="text"
                      onChange={(e) => handleAddmember(e, index)}
                      value={member.memberContactNo}
                    />
                    {/* Render the image preview if available */}
                    <label>Member Profile:</label>
                    <div className="form-image">
                      {member.image && (
                        <img src={member.image} alt="member" width="100" />
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleAddmember(e, index)}
                      />
                    </div>
                    <br></br>
                    <button className="icon" type="button" onClick={handleSave}>
                      {" "}
                      Save{" "}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button
                      type="button"
                      onClick={() => removeAddmember(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addAddmember}>
                Add Member
              </button>
            </div>
          )}

          {/* {activeTab === "work" && (
            <div> */}
          {/* <label>Work Experience</label> */}
          {/* {workExperience.map((work, index) => {
                return (
                  <div key={index}>
                    <label>Name of Position:</label>
                    <input placeholder="Enter your position ex: Software Engineer"
                      name="nameOfPosition"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.nameOfPosition}
                    />
                    <label>Company Name:</label>
                    <input placeholder="Enter your company name"
                      name="companyName"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.companyName}
                    />
                    <label>Start Date:</label>
                    <input  placeholder="Enter your start date"
                      name="startDate"
                      type="date"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.startDate}
                    />
                    <label>End Date:</label>
                    <input  placeholder="Enter your resign date"
                      name="endDate"
                      type="date"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.endDate}
                    />
                    <label>Industry Name:</label>
                    <input placeholder="Enter your industry name ex: IT"
                      name="industryName"
                      type="text"
                      onChange={(e) => handleWorkExperience(e, index)}
                      value={work.industryName}
                    /> */}

          {/* <label>
                          <input type="checkbox" name="agree" value="yes"/>
                          I'm currently working here
                        </label>
                        <br></br> */}

          {/* <button type="button" onClick={handleSave}> Save </button>
                    {error && <div className="error">{error}</div>}
                    <br></br>
                    <br></br>
                    <button type="button" onClick={() => removeWorkExperience(index)}>
                      REMOVE
                    </button>
                  </div>
                );
              })} */}
          {/* <br></br>
            <button type="button" onClick={addWorkExperience}>
              Add Work Experience
            </button>
          </div>
        )} */}
          {/* {activeTab === "skills" && (
          <div> */}
          {/* <label>Skills</label> */}
          {/* <label>Select your Programming Skills</label>
              <div className="form-check">
                <input type="checkbox" name="skills" value="Python" /> Python
                <input type="checkbox" name="skills" value="Java" /> Java
                <input type="checkbox" name="skills" value="JavaScript" /> JavaScript
                <input type="checkbox" name="skills" value="other" /> other
              </div>
            {skills.map((skill, index) => {
              return (
                <div key={index}>
                  <label>Skill:</label>
                  <input placeholder="Enter your skill ex: Python"
                    name="AddSkills"
                    type="text"
                    onChange={(e) => handleSkills(e, index)}
                    value={skill.AddSkills}
                  />
                  
                  <button type="button" onClick={handleSave}> Save </button>
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
      )} */}
          {activeTab === "achievements" && (
            <div>
              {achievements.map((achievement, index) => {
                return (
                  <div key={index}>
                    <label>Name:</label>
                    <input
                      placeholder="Enter your achievement name ex: Hackathon Winner"
                      name="achievementsName"
                      type="text"
                      onChange={(e) => handleAchievements(e, index)}
                      value={achievement.achievementsName}
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
                    <label>Description:</label>
                    <input
                      placeholder="Enter your achievement description"
                      name="achievementsDescription"
                      type="text"
                      onChange={(e) => handleAchievements(e, index)}
                      value={achievement.achievementsDescription}
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

          {activeTab === "expertise" && (
            <div>
              {expertise.map((expert, index) => {
                return (
                  <div key={index}>
                    <label>Field:</label>
                    <input
                      placeholder="Enter your expertise field ex: Web Development"
                      name="expertiseField"
                      type="text"
                      onChange={(e) => handleExpertise(e, index)}
                      value={expert.expertiseField}
                    />
                    <label>Description:</label>
                    <input
                      placeholder="Enter your expertise description"
                      name="describeExpertise"
                      type="text"
                      onChange={(e) => handleExpertise(e, index)}
                      value={expert.describeExpertise}
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
                      onClick={() => removeExpertise(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                );
              })}
              <br></br>
              <button type="button" onClick={addExpertise}>
                Add Expertise
              </button>
            </div>
          )}
          {activeTab === "Project" && (
            <div>
              {projects.map((project, index) => {
                return (
                  <div key={index}>
                    <label>Project Name:</label>
                    <input
                      placeholder="Enter your project name ex: E-commerce website"
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

export default ConsultantTeamProfileCreateForm;
