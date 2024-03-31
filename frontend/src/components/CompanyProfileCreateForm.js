import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const CompanyProfileCreateForm = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [locationsName, setLocationsName] = useState("");
  const [foundedYear, setFoundedyear] = useState("");
  const [members, setMembers] = useState("");
  const [industry, setIndustry] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [file, setFile] = useState(null);
  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!handleWebsiteChange(website)) {
      setError("Please enter a valid website URL");
      return;
    }


    const data = {
      CompanyName,
      website,
      locationsName,
      foundedYear,
      members,
      industry,
      achievements,
      file,
      about,
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
      setCompanyName("");
      setWebsite("");
      setLocationsName("");
      setFoundedyear("");
      setMembers("");
      setIndustry("");
      setAbout("");
      navigate("/company/profile")
    }
  };
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = value;
    setAchievements(updatedAchievements);
  };

  const addAchievementField = () => {
    if (achievements.length < 4) {
      setAchievements([...achievements, ""]);
    }
  };

  const removeAchievementField = (index) => {
    const updatedAchievements = [...achievements];
    updatedAchievements.splice(index, 1);
    setAchievements(updatedAchievements);
  };

  const cancelCreateProfile = () => {
    setCompanyName("");
    setWebsite("");
    setLocationsName("");
    setFoundedyear("");
    setMembers("");
    setIndustry("");
    setAbout("");

    navigate("/"); // Redirect to home page
  };



  const handleWebsiteChange = (site) => {
    const inputWebsite = site;

    // Regex to check for a basic URL format with domain extension
    if (/^(ftp|http|https):\/\/[^ "]+(\.[a-zA-Z]{2,})+$/.test(inputWebsite)) {
      return true;
    } else {
      return false;
    }

  };


  return (
    <form className="create bg-gray-400 px-14 py-16 rounded-lg" onSubmit={handleSubmit}>
      <h3 className="text-black text-3xl text-center -mt-4 mb-10">
        Create Your Company Profile!
      </h3>
      <label>Company Name: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        onChange={(e) => setCompanyName(e.target.value)}
        required
        value={CompanyName}
        className={emptyFields?.includes("companyName") ? "error" : ""}
      />

      <label>Website: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        onChange={(e) => setWebsite(e.target.value)}
        required
        value={website}
        className={emptyFields?.includes("website") ? "error" : ""}
      />
      <label>Location Name: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        onChange={(e) => setLocationsName(e.target.value)}
        required
        value={locationsName}
        className={emptyFields?.includes("locationsName") ? "error" : ""}
      />

      <label>Founded Year: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        required
        minLength="4"
        maxLength="4"
        onChange={(e) => {
          const inputYear = e.target.value;
          if (/^\d{0,4}$/.test(inputYear)) {
            setFoundedyear(inputYear);
          }
        }}
        value={foundedYear}
        className={emptyFields?.includes("foundedyear") ? "error" : ""}
      />

      <label>Members: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        onChange={(e) => {
          const inputMembers = e.target.value;
          if (/^\d{0,9}$/.test(inputMembers)) {
            setMembers(inputMembers);
          }
        }}
        required
        value={members}
        className={emptyFields?.includes("members") ? "error" : ""}
      />

      <label>Industry: <span className='text-red-600'>*</span></label>
      <input
        type="text"
        onChange={(e) => setIndustry(e.target.value)}
        required
        value={industry}
        className={emptyFields?.includes("industry") ? "error" : ""}
      />

      {/* Other form inputs */}
      <label>Company Logo: <span className=''>*</span></label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={emptyFields?.includes("file") ? "error" : ""}
      />


      <label>Achievements: <span className=''>*</span></label>
      {achievements.map((achievement, index) => (
        <div key={index}>
          <input
            type="text"
            onChange={(e) => handleAchievementChange(index, e.target.value)}
            value={achievement}
            required
            className={emptyFields?.includes("achievements") ? "error" : ""}
          />
          {index > 0 && (
            <div className="flex flex-row place-content-end">
              <button
                type="button"
                className="button"
                class="mb-2 w-fit rounded-lg bg-red-600 px-5 py-2 text-xs font-medium text-white hover:bg-red-500 focus:ring-4 focus:ring-red-400"
                onClick={() => removeAchievementField(index)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      {achievements.length < 4 && (
        <button
          type="button"
          className="mb-5 w-fit rounded-lg bg-green-600 px-5 py-2 text-xs font-medium text-white hover:bg-green-500 focus:ring-4 focus:ring-green-400"
          onClick={addAchievementField}
        >
          Add Achievement
        </button>
      )}

      <label>About your Company: <span className='text-red-600'>*</span></label>
      <textarea
        required
        type="text"
        onChange={(e) => setAbout(e.target.value)}
        value={about}
        className={emptyFields?.includes("about") ? "error" : "w-full p-3"}
      />

      <br></br>
      <br></br>
      <br></br>

      <div className="flex flex-row gap-6 -mb-3">
        <button
          type="button"
          onClick={cancelCreateProfile}
          className="text-white hover:text-white border border-red-700 hover:bg-red-800 bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white hover:text-white border border-blue-700 hover:bg-blue-800 bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default CompanyProfileCreateForm;
