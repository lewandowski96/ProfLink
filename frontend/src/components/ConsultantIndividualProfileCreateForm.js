import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ConsultantIndividualProfileCreateForm = () => {
  const[activeTab, setActiveTab] = useState("personal");
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
  const [userName, setUserName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [yourLocation, setYourLocation] = useState("");
  const [yourSelf, setYourSelf] = useState("");
  const [Project, setProject] = useState([
    { ProjectName: "", ProjectDescription: ""}
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
  const { user } = useAuthContext();

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

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
      Project,
    };

    console.log(data);

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
      setProject([
        { ProjectName: "", ProjectDescription: "" }
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
    <div className="individual-header">
      <h3>Create Your Individual Consultant Profile</h3>
      {/*Tab navigation*/}
      <div className="tab-navigation">
        <button onClick={() => handleTabChange("personal")}>Personal</button>
        <button onClick={() => handleTabChange("education")}>Education</button>
        <button onClick={() => handleTabChange("work")}>Work Experience</button>
        <button onClick={() => handleTabChange("skills")}>Skills</button>
        <button onClick={() => handleTabChange("achievements")}>Achievements</button>
        <button onClick={() => handleTabChange("Project")}>Project</button>
      </div>

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
          <label>Your User Name:</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className={emptyFields.includes("userName") ? "error" : ""}
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
          <label>Your Location:</label>
          <input
            type="text"
            onChange={(e) => setYourLocation(e.target.value)}
            value={yourLocation}
            className={emptyFields.includes("yourLocation") ? "error" : ""}
          />
          <label>Your Self:</label>
          <input
            type="text"
            onChange={(e) => setYourSelf(e.target.value)}
            value={yourSelf}
            className={emptyFields.includes("yourSelf") ? "error" : ""}
          />
          <button type="button" onClick={handleSave}> Save </button>
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
                  name="universityName"
                  type="text"
                  onChange={(e) => handleSchoolsAttended(e, index)}
                  value={school.universityName}
                />
                <label>Year:</label>
                <input
                  name="year"
                  type="text"
                  onChange={(e) => handleSchoolsAttended(e, index)}
                  value={school.year}
                />
                <label>Degree:</label>
                <input
                  name="degree"
                  type="text"
                  onChange={(e) => handleSchoolsAttended(e, index)}
                  value={school.degree}
                />
                <label>Field of Study:</label>
                <input
                  name="fieldOfStudy"
                  type="text"
                  onChange={(e) => handleSchoolsAttended(e, index)}
                  value={school.fieldOfStudy}
                />
                <label>Description:</label>
                <input
                  name="description"
                  type="text"
                  onChange={(e) => handleSchoolsAttended(e, index)}
                  value={school.description}
                /> 
                <button  className="icon" type="button" onClick={handleSave}> Save </button>
                <br></br>
                <br></br>
                <button className="icon" type="button" onClick={() => removeSchoolsAttended(index)}>
                  REMOVE
                </button>
              </div>
            );
          })}
          <br></br>
          <button className="icon" type="button" onClick={addSchoolsAttended}>
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


export default ConsultantIndividualProfileCreateForm;
