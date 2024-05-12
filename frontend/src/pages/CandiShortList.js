import React, { useEffect, useState } from "react";
import Sidemenu from "../components/Sidemenu";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";


import CompanySList from "../components/CompanySList";

const CandiShortList = () => {
  const [companies, setCompanies] = useState(null);
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user);

  const [selectedScore, setSelectedScore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const scores = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ];
  const sampleData = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ];

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
    setShowDropdown(false);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCandidates = sampleData.filter((company) => {
    const matchesScore =
      !selectedScore || company.includes(selectedScore.toString());
    const matchesQuery =
      !searchQuery || company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesScore && matchesQuery;
  });

  return (
    <>
    <Navbar />
    <div className="company-listing">
      <h2 className="text-3xl relative font-semibold font-mono">
        Candidates Shortlist
      </h2>
      <div className="sub w-full">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="w-full">
          <form className="">
            <div className="flex flex-col items-center mr-5 ">
              <button
                id="dropdownSearchButton"
                data-dropdown-toggle="dropdownSearch"
                onClick={() => setShowDropdown(!showDropdown)}
                data-dropdown-placement="bottom"
                className="inline-flex h-9 w-25 items-center rounded-lg mr-36 bg-white outline outline-gray-400 px-5 py-2.5 text-center text-sm font-medium text-black hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Score Rate
                <svg
                  className="ms-3 h-2.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div
                  id="dropdownSearch"
                  className="absolute z-10 mt-2 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
                >
                  <div className="p-3">
                    <label htmlFor="input-group-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        onChange={handleSearchQueryChange}
                        id="input-group-search"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Search Score"
                      />
                    </div>
                  </div>
                  <ul
                    className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {scores.map((score) => (
                      <li key={score}>
                        <div className="relative flex flex-row place-content-start gap-5 items-baseline rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id={score}
                            name="score"
                            type="radio"
                            value={score}
                            checked={selectedScore === score}
                            onChange={() => handleScoreSelect(score)}
                            className="h-4 w-4 relative top-1 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                          />
                          <label
                            htmlFor={score}
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            {score}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                className="h-9 -mt-9 rounded-lg ml-32 bg-blue-700 px-2 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16">
            {filteredCandidates.map((company) => (
              <CompanySList key={company} company={company} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CandiShortList;
