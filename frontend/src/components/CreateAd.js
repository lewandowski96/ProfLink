import { Box } from "@mui/material";
import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";
const CreateAd = () => {
  const [Project, setProject] = useState("");

  const removeProject = (index) => {
    let data = [...Project];
    data.splice(index, 1);
    setProject(data);
  };

  return (
    <div>
      <Navbar/>
    <div className="create-ad-form">
      
      <h1><b>Create Your Advertisements</b></h1>
      <form>
        <label>Ad Titel</label>
        <input placeholder="Enter your Ad title" />
        <label>Ad Description</label>
        <input placeholder="Descripton About Ad" />
        <label>Target Audience</label>
        <select>
          <optgroup label="Industries">
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance"</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Hospitality">IHospitality</option>
            <option value="Transportation">Transportation</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Retail">Retail</option>
          </optgroup>
          <optgroup label="Others">
            <option value="Young Professionals">Young Professionals</option>
            <option value="Fitness Enthusiasts">Fitness Enthusiasts</option>
            <option value="Students">Students</option>
            <option value="Tech Enthusiasts">Tech Enthusiasts</option>
            <option value="Fashionistas">Fashionistas</option>
            <option value="Foodies">Foodies</option>
            <option value="utdoor Adventurers">utdoor Adventurers</option>
            <option value="Art Lovers">Art Lovers</option>
            <option value="Bookworms">Bookworms</option>
          </optgroup>
        </select>
        <label>Images/Videos:</label>
        <input type="file" />
        <button type="button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default CreateAd;
