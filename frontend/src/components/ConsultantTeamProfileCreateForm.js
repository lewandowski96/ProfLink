import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const ConsultantTeamProfileCreateForm = () => {
  const[activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Addmember: "",
    contactNo: "",
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
    achievements: [
      { achievementsName: "", achievementsDescription: "" },
    ],
    Project: [
      { ProjectName: "", ProjectDescription: "" }
    ],
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [Addmember, setAddmember] = useState([{ memberName: "", memberEmail: "", memberContactNo: "" }]);
  const [Project, setProject] = useState([
    { ProjectName: "", ProjectDescription: ""}
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
  const [expertise, setExpertise] = useState(
    [{ expertiseField: "", describeExpertise: "" }]
  );
  const [achievements, setAchievements] = useState([
    { achievementsName: "", achievementsDescription: "" },
  ]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

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
    let data = [...Project];
    data[index][e.target.name] = e.target.value;
    setProject(data);
  };  

  const addProject = () => {
    let newProject = {
      ProjectName: "",
      ProjectDescription: "",
    };
    setProject([...Project, newProject]);
  };

  const removeProject = (index) => {
    let data = [...Project];
    data.splice(index, 1);
    setProject(data);
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

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const data = {
      fullName,
      email,
      Addmember,
      contactNo,
      workExperience,
      addSkills,
      skills,
      Project,
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
      setAddmember([{ memberName: "", memberEmail: "", memberContactNo: "" }]);
      setContactNo("");
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
      setProject([
        { ProjectName: "", ProjectDescription: "" }
      ]);
      setExpertise([
        { expertiseField: "", describeExpertise: "" }
      ]);
      achievements([
        { achievementsName: "", achievementsDescription: "" },
      ]);

      setError(null);
      setEmptyFields([]);
      console.log("profile saved", json);
    }
  };


  // const handleNext = () => {
  //   const nextTab = getNextTab();
  //   if(nextTab){
  //     setActiveTab(nextTab);
  //   }
  // };

  const getNextTab = () => {
    const tabs = ["personal", "education", "work", "skills", "achievements", "Project"];
    const currentTabIndex = tabs.indexOf(activeTab);
    if(currentTabIndex < tabs.length - 1){
      return tabs[currentTabIndex + 1];
    }
    return null;
  };

  const handleSave = () => {
    const nextTab = getNextTab();
    if(nextTab){
      setActiveTab(nextTab);
    }
  }

  /* setFormData is used to update the form data state object. */
  const setFormValues = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };



  return (
    <div className="team-header">
      <h3>Create Your Team Consultant Profile</h3>
      {/*Tab navigation*/}
      <div className="tab-navigation">
        <button onClick={() => handleTabChange("personal")}>Team Members</button>
        <button onClick={() => handleTabChange("work")}>Work Experience</button>
        <button onClick={() => handleTabChange("skills")}>Skills</button>
        <button onClick={() => handleTabChange("achievements")}>Achievements</button>
        <button onClick={() => handleTabChange("expertise")}>Expertise</button>
        <button onClick={() => handleTabChange("Project")}>Project</button>
      </div>
      {/*Form*/}
    <form class="create" onSubmit={handleSubmit} className="form-container">  
      {activeTab === "personal" && (
        <div>
          {/* <label>Personal</label> */}
          <label>Your Full Name:</label>
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className={emptyFields.includes("fullName") ? "error" : ""}
          />
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes("email") ? "error" : ""}
          />
          <label>Contact No:</label>
          <input
            type="text"
            onChange={(e) => setContactNo(e.target.value)}
            value={contactNo}
            className={emptyFields.includes("contactNo") ? "error" : ""}
          />        
                <button type="button" onClick={handleSave}> Save </button>
                </div>
      )}
      {activeTab === "personal" && (
        <div>
          <br></br>
          {/* <label>Team Members</label> */}
          {Addmember.map((member, index) => {
            return (
              <div key={index}>
                <label>Member Name:</label>
                <input
                  name="memberName"
                  type="text"
                  onChange={(e) => handleAddmember(e, index)}
                  value={member.memberName}
                />
                <label>Member Email:</label>
                <input
                  name="memberEmail"
                  type="text"
                  onChange={(e) => handleAddmember(e, index)}
                  value={member.memberEmail}
                />
                <label>Member Contact No:</label> 
                <input
                  name="memberContactNo"
                  type="text"
                  onChange={(e) => handleAddmember(e, index)}
                  value={member.memberContactNo}
                />
                <button type="button" onClick={handleSave}> Save </button>
                <br></br>
                <br></br>
                <button type="button" onClick={() => removeAddmember(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button type="button" onClick={addAddmember}>
            Add More..
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
                  name="nameOfPosition"
                  type="text"
                  onChange={(e) => handleWorkExperience(e, index)}
                  value={work.nameOfPosition}
                />
                <label>Company Name:</label>
                <input
                  name="companyName"
                  type="text"
                  onChange={(e) => handleWorkExperience(e, index)}
                  value={work.companyName}
                />
                <label>Start Date:</label>
                <input
                  name="startDate"
                  type="date"
                  onChange={(e) => handleWorkExperience(e, index)}
                  value={work.startDate}
                />
                <label>End Date:</label>
                <input
                  name="endDate"
                  type="date"
                  onChange={(e) => handleWorkExperience(e, index)}
                  value={work.endDate}
                />
                <label>Industry Name:</label>
                <input
                  name="industryName"
                  type="text"
                  onChange={(e) => handleWorkExperience(e, index)}
                  value={work.industryName}
                />
                <button type="button" onClick={handleSave}> Save </button>
                <br></br>
                <br></br>
                <button type="button" onClick={() => removeWorkExperience(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button type="button" onClick={addWorkExperience}>
            Add More..
          </button>
        </div>
      )}
      {activeTab === "skills" && (
        <div>
          {/* <label>Skills</label> */}
          {skills.map((skill, index) => {
            return (
              <div key={index}>
                <label>Skill Name:</label>
                <input
                  name="AddSkills"
                  type="text"
                  onChange={(e) => handleSkills(e, index)}
                  value={skill.AddSkills}
                />
                <button type="button" onClick={handleSave}> Save </button>
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
            Add More..
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
                  name="achievementsName"
                  type="text"
                  onChange={(e) => handleAchievements(e, index)}
                  value={achievement.achievementsName}
                />
                <label>Description:</label>
                <input
                  name="achievementsDescription"
                  type="text"
                  onChange={(e) => handleAchievements(e, index)}
                  value={achievement.achievementsDescription}
                />

                <button type="button" onClick={handleSave}> Save </button>
                <br></br>
                <br></br>
                <button type="button" onClick={() => removeAchievements(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button type="button" onClick={addAchievements}>
            Add More..
          </button>
        </div>
      )}

      {activeTab === "expertise" && (
        <div>
          {/* <label>Expertise</label> */}
          {expertise.map((expert, index) => {
            return (
              <div key={index}>
                <label>Field:</label>
                <input

                  name="expertiseField"
                  type="text"
                  onChange={(e) => handleExpertise(e, index)}
                  value={expert.expertiseField}
                />
                <label>Description:</label>
                <input

                  name="describeExpertise"
                  type="text"
                  onChange={(e) => handleExpertise(e, index)}
                  value={expert.describeExpertise}
                />
                <button type="button" onClick={handleSave}> Save </button>
                <br></br>
                <br></br>
                <button type="button" onClick={() => removeExpertise(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button type="button" onClick={addExpertise}>
            Add More..
          </button>
        </div>
      )}
      {activeTab === "Project" && (
        <div>
          {/* <label>Project</label> */}
          {Project.map((project, index) => {
            return (
              <div key={index}>
                <label>Project Name:</label>
                <input
                  name="ProjectName"
                  type="text"
                  onChange={(e) => handleProject(e, index)}
                  value={project.ProjectName}
                />
                <label>Project Description:</label>
                <input
                  name="ProjectDescription"
                  type="text"
                  onChange={(e) => handleProject(e, index)}
                  value={project.ProjectDescription}
                />
                <button type="button" onClick={() => removeProject(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button type="button" onClick={addProject}>
            Add More
          </button>
          <br></br>
          <br></br>
            <button type="submit">CREATE PROFILE</button>
            {error && <div className="error">{error}</div>}
              </div>
      )} 

    </form>
  </div>

  );
};

    

export default ConsultantTeamProfileCreateForm;
