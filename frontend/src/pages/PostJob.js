import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Sidemenu from '../components/Sidemenu';

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [locations, setLocations] = useState("");
  const [salary, setSalary] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check for empty fields
    const requiredFields = ['jobTitle', 'locations', 'salary', 'startTime', 'endTime', 'selectedOption'];
    const emptyFields = requiredFields.filter(field => !eval(field));
    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      setError("Please fill in all required fields.");
      return;
    }

    // Validation: Check if salary is a valid number
    if (!/^\d*\.?\d*$/.test(salary)) {
      setError("Salary must be a valid number.");
      return;
    }

    // Validation: Check if start time is before end time
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (startDate >= endDate) {
      setError("Start time must be before end time.");
      return;
    }

    // Validation: Check if an application submission method is selected
    if (!selectedOption) {
      setError("Please select an application submission method.");
      return;
    }

    // Validation passed, proceed to submit
    setError(null);
    setEmptyFields([]);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const data = {
      jobTitle,
      locations,
      salary,
      startTime,
      endTime,
      selectedOption,
    };

    try {
      const response = await fetch("http://localhost:4000/api/post/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
        setEmptyFields(errorData.emptyFields || []);
      } else {
        setJobTitle("");
        setLocations("");
        setSalary("");
        setStartTime("");
        setEndTime("");
        setSelectedOption("");
        navigate("/company/profile/");
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const cancelCreateProfile = () => {
    setJobTitle("");
    setLocations("");
    setSalary("");
    setStartTime("");
    setEndTime("");
    setSelectedOption("");

    navigate("/company/profile") // Redirect to home page
  };

  return (
    <div className="view-consultant-profile">
      <h2 className='text-3xl relative left-24 font-mono'>Post Job Vacancy</h2>
      <div className="sub">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="w-full">
          <form className="create flex flex-col items-center rounded-md bg-gray-300 px-5 py-8 " onSubmit={handleSubmit}>
            <div className='w-[75%]'>
              <label className=''>Job Title <span className='text-red-600'>*</span></label>
              <input
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
                required
                value={jobTitle}
                className={emptyFields.includes("jobTitle") ? "error" : ""}
              />
            </div>
            <div className='w-[75%]'>
              <label className=''>Locations <span className='text-red-600'>*</span></label>
              <input
                type="text"
                onChange={(e) => setLocations(e.target.value)}
                required
                value={locations}
                className={emptyFields.includes("locations") ? "error" : ""}
              />
            </div>
            <div className='w-[75%]'>
              <label className=''>Salary <span className='text-red-600'>*</span></label>
              <input
                type="text"
                onChange={(e) => {
                  const inputSalary = e.target.value;
                  if (/^\d{0,10}(\.\d{0,2})?$/.test(inputSalary)) {
                    setSalary(inputSalary);
                  }
                }}
                required
                value={salary}
                className={emptyFields.includes("salary") ? "error" : ""}
              />
            </div>
            <div className='w-[75%]'>
              <label className=''>Start Time <span className='text-red-600'>*</span></label>
              <input
                type="date"
                onChange={(e) => setStartTime(e.target.value)}
                required
                value={startTime}
                className={emptyFields.includes("startTime") ? "error" : ""}
              />
            </div>
            <div className='w-[75%]'>
              <label className=''>End Time <span className='text-red-600'>*</span></label>
              <input
                type="date"
                onChange={(e) => setEndTime(e.target.value)}
                required
                value={endTime}
                className={emptyFields.includes("endTime") ? "error" : ""}
              />
            </div>
            <div className='w-[75%] flex flex-row place-content-between items-center mt-2'>
              <label className='relative top-5'>Application submission method <span className='text-red-600'>*</span></label>
              <div className='mr-16 relative right-14 top-0'>
                <button
                  id="dropdownDividerButton"
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex absolute top-0 w-28 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  {selectedOption ? selectedOption : 'Select'}
                  <svg
                    className={`ms-3 h-2.5 w-2.5 ${isOpen ? 'transform rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id="dropdownDivider"
                    className="z-10 absolute top-12 w-28 mt-1 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                      <li>
                        <button
                          onClick={() => handleOptionSelect('Online')}
                          className="block px-4 py-2 text-center w-full bg-white text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none"
                        >
                          Online
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleOptionSelect('Email')}
                          className="block px-4 py-2 text-center w-full bg-white text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none"
                        >
                          Email
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {selectedOption && (
                  <div className="mt-2 absolute top-12 w-32 text-sm text-gray-700 dark:text-gray-200">
                    Selected: {selectedOption}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row place-content-center gap-24 mt-32">
              <button type="button" onClick={cancelCreateProfile} className="bg-red-600 text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
              {error && <div className="error">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
