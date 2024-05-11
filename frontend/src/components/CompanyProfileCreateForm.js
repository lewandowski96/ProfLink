import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";
import useStorage from "../hooks/useStorage";


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
  // const { user } = useAuthContext();
  const [progress, setProgress] = useState(null);
  const [url, setUrl] = useState("");
  const { startUpload } = useStorage(setProgress, setError, setUrl);

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
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
      url,
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
      navigate("/company/profile");
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
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      startUpload(e.target.files[0]);
      const selectedImageFile = new FileReader();

      selectedImageFile.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form className="create w-1/2 m-auto max-md:w-96" onSubmit={handleSubmit}>
      <h3 className="text-black text-3xl text-center mb-5">
        Create Your Company Profile!
      </h3>
      <label>Company Name:</label>
      <input
        type="text"
        onChange={(e) => setCompanyName(e.target.value)}
        required
        value={CompanyName}
        className={emptyFields?.includes("companyName") ? "error" : ""}
      />

      <label>Website:</label>
      <input
        type="text"
        onChange={(e) => setWebsite(e.target.value)}
        required
        value={website}
        className={emptyFields?.includes("website") ? "error" : ""}
      />
      <label>Locations Name:</label>
      <input
        type="text"
        onChange={(e) => setLocationsName(e.target.value)}
        required
        value={locationsName}
        className={emptyFields?.includes("locationsName") ? "error" : ""}
      />

      <label>Founded Year:</label>
      <input
        type="text"
        pattern="[1-9]*"
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

      <label>Members:</label>
      <input
        type="text"
        onChange={(e) => setMembers(e.target.value)}
        required
        value={members}
        className={emptyFields?.includes("members") ? "error" : ""}
      />

      <label>Industry:</label>
      <input
        type="text"
        onChange={(e) => setIndustry(e.target.value)}
        required
        value={industry}
        className={emptyFields?.includes("industry") ? "error" : ""}
      />

      {/* Other form inputs */}
      <label>Company Logo:</label>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
        onChange={handleFileChange}
        className={emptyFields?.includes("file") ? "error" : ""}
      />

      <label>Achievements:</label>
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
          className="mb-2 w-fit rounded-lg bg-green-600 px-5 py-2 text-xs font-medium text-white hover:bg-green-500 focus:ring-4 focus:ring-green-400"
          onClick={addAchievementField}
        >
          Add Achievement
        </button>
      )}

      <label>About your Company:</label>
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

      <div className="flex flex-row gap-6">
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
