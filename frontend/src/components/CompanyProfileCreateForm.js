import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const CompanyProfileCreateForm = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [locationsName, setLocationsName] = useState("");
  const [foundedYear, setFoundedyear] = useState("");
  const [members, setMembers] = useState("");
  const [industry, setIndustry] = useState("");
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

    const data = {
      CompanyName,
      locationsName,
      foundedYear,
      members,
      industry,
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
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setCompanyName("");
      setLocationsName("");
      setFoundedyear("");
      setMembers("");
      setIndustry("");
      setAbout("");
    }

  };

  const cancelCreateProfile = () => {
    setCompanyName("");
    setLocationsName("");
    setFoundedyear("");
    setMembers("");
    setIndustry("");
    setAbout("");

    navigate("/") // Redirect to home page
  };

  return (

    <form className="create" onSubmit={handleSubmit}>

      <h3 className="text-black text-3xl text-center mb-5">Create Your Company Profile!</h3>
      <label>Company Name:</label>
      <input
        type="text"
        onChange={(e) => setCompanyName(e.target.value)}
        required
        value={CompanyName}
        className={emptyFields.includes("companyName") ? "error" : ""}
      />
      <label>Locations Name:</label>
      <input
        type="text"
        onChange={(e) => setLocationsName(e.target.value)}
        required
        value={locationsName}
        className={emptyFields.includes("locationsName") ? "error" : ""}
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
        className={emptyFields.includes("foundedyear") ? "error" : ""}
      />

      <label>Members:</label>
      <input
        type="text"
        onChange={(e) => setMembers(e.target.value)}
        required
        value={members}
        className={emptyFields.includes("members") ? "error" : ""}
      />



      <label>Industry:</label>
      <input
        type="text"
        onChange={(e) => setIndustry(e.target.value)}
        required
        value={industry}
        className={emptyFields.includes("industry") ? "error" : ""}
      />


      <label>About your Company:</label>
      <textarea
        required
        type="text"
        onChange={(e) => setAbout(e.target.value)}
        value={about}
        className={emptyFields.includes("about") ? "error" : ""}
      />


      <br></br>
      <br></br>
      <br></br>

      <div className="flex flex-row gap-6">
        <button type="button" onClick={cancelCreateProfile} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">Cancel</button>
        <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
        {error && <div className="error">{error}</div>}
      </div>

    </form>
  );

};

export default CompanyProfileCreateForm;