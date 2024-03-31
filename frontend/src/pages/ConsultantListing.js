// import ConsultantDetails from "../components/ConsultantDetails";

import React, { useEffect, useState } from "react";
import CompanyDetails from "../components/CompanyDetails";
import Sidemenu from "../components/Sidemenu";
import { useAuthContext } from "../hooks/useAuthContext";

const ConsultantListing = () => {
  const { user } = useAuthContext();
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const cities = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const [companies, setCompanies] = useState([
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Consultants A",
      location: "Technology",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Consultants B",
      location: "IT",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Consultants C",
      location: "Finance",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Consultants D",
      location: "Nursing",
    },
  ]);

  const handleCitySelect = (city) => {
    if (selectedCity === city) {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
    setShowDropdown(false);
  };

  const handleNameSearch = (event) => {
    setNameSearch(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    console.log(searchQuery);
    console.log(filteredCompanies);
    setSearchQuery(event.target.value);
    setSelectedCity(null); // Reset selected city when searching
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/profiles/company/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        // setCompanies(json);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [user]);

  const filteredCompanies = cities
    ? cities.filter((city) => {
      const matchesCity = !selectedCity || city === selectedCity;

      const matchesQuery =
        !searchQuery ||
        city.toLowerCase().includes(searchQuery.toLowerCase());

      const idle = !searchQuery || searchQuery.length <= 0;

      console.log(matchesQuery);
      console.log(matchesCity);

      return (matchesCity && matchesQuery) || idle;
    })
    : [];

  const handleSubmit = () => {
    const filteredResult = companies.filter((company) => {
      return (
        (selectedCity === null || company.location === selectedCity) &&
        (nameSearch === "" ||
          company.name.toLowerCase().includes(nameSearch.toLowerCase()))
      );
    });
    setCompanies(filteredResult); // Update state with filtered result
  };
  // const [indiConsultants, setIndiConsultants] = useState(null);
  // const [teamConsultants, setTeamConsultants] = useState(null);
  // const { user } = useAuthContext();

  // useEffect(() => {
  //   const fetchIndiConsultants = async () => {
  //     const response = await fetch("/api/profiles/consultant/individual/all", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       setIndiConsultants(json);
  //     }
  //   };

  //   const fetchTeamConsultants = async () => {
  //     const response = await fetch("/api/profiles/consultant/team/all", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       setTeamConsultants(json);
  //     }
  //   };

  //   if (user) {
  //     fetchIndiConsultants();
  //     fetchTeamConsultants();
  //   }
  // }, [user]);

  return (
    <div className="consultant-listing">
      <h2 className="relative left-10 -top-3 text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">Consultants</h2>
      <div className="sub w-full">
        <div className="sidemenu">
          <Sidemenu />
        </div>
        <div className="consultants">

          <h4 className="text-balck mx-auto mt-4 mb-6 text-left pl-10 text-2xl font-semibold font-mono">Individual Consultants</h4>

          <div className="w-full ">
            <div className="">
              <div className="flex flex-row place-content-center gap-3">
                <div className="relative ">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 mb-3 text-gray-500 dark:text-gray-400"
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
                    type="search"
                    id="default-search"
                    className="block h-9 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search for experties..."
                    onChange={handleNameSearch}
                    value={nameSearch}
                    required
                  />
                </div>

                <div className="mt-3">
                  <button
                    id="dropdownSearchButton"
                    data-dropdown-toggle="dropdownSearch"
                    onClick={() => setShowDropdown(!showDropdown)}
                    data-dropdown-placement="bottom"
                    className="inline-flex h-9 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    {selectedCity || "Industries"}
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
                            value={searchQuery}
                            id="input-group-search"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Search Location"
                          />
                        </div>
                      </div>
                      <ul
                        className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownSearchButton"
                      >
                        {filteredCompanies.map((city) => (
                          <li key={city}>
                            <div className="relative flex flex-row place-content-start gap-5 items-baseline rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={city}
                                name="city"
                                type="radio"
                                value={city}
                                checked={selectedCity === city}
                                onClick={() => handleCitySelect(city)}
                                className="h-4 w-4 relative top-1 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                              />
                              <label
                                htmlFor={city}
                                className="font-medium text-gray-900 dark:text-gray-300"
                              >
                                {city}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="h-9 mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="w-full px-20 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 h-[300px] overflow-auto py-5">
              {companies &&
                companies.map((item, index) => (
                  <div
                    key={index}
                    class="w-56 h-72 rounded-lg border flex flex-col items-center border-gray-200 bg-white shadow pt-10 px-4"
                  >
                    <div class="h-32 w-36">
                      <img
                        class="h-full w-full rounded-lg object-cover"
                        src={item.imageUrl}
                        alt=""
                      />
                    </div>
                    <div class="p-5">
                      <span>
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight text-gray-700">
                          {item.name}
                        </h5>
                      </span>
                      <p class="mb-3 text-center font-semibold text-sm text-gray-700">
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* </div> */}

          {/* <div className="team-consultants"> */}

          <h4 className="text-balck mx-auto mt-4 mb-6 text-left pl-10 text-2xl font-semibold font-mono">Team Consultants</h4>

          <div className="w-full ">
            <div className="">
              <div className="flex flex-row place-content-center gap-3">
                <div className="relative ">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 mb-3 text-gray-500 dark:text-gray-400"
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
                    type="search"
                    id="default-search"
                    className="block h-9 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search for experties..."
                    onChange={handleNameSearch}
                    value={nameSearch}
                    required
                  />
                </div>

                <div className="mt-3">
                  <button
                    id="dropdownSearchButton"
                    data-dropdown-toggle="dropdownSearch"
                    onClick={() => setShowDropdown(!showDropdown)}
                    data-dropdown-placement="bottom"
                    className="inline-flex h-9 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    {selectedCity || "Industries"}
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
                            value={searchQuery}
                            id="input-group-search"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Search Location"
                          />
                        </div>
                      </div>
                      <ul
                        className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownSearchButton"
                      >
                        {filteredCompanies.map((city) => (
                          <li key={city}>
                            <div className="relative flex flex-row place-content-start gap-5 items-baseline rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={city}
                                name="city"
                                type="radio"
                                value={city}
                                checked={selectedCity === city}
                                onClick={() => handleCitySelect(city)}
                                className="h-4 w-4 relative top-1 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                              />
                              <label
                                htmlFor={city}
                                className="font-medium text-gray-900 dark:text-gray-300"
                              >
                                {city}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="h-9 mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="w-full px-20 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 h-[300px] overflow-auto py-5">
              {companies &&
                companies.map((item, index) => (
                  <div
                    key={index}
                    class="w-56 h-72 rounded-lg border flex flex-col items-center border-gray-200 bg-white shadow pt-10 px-4"
                  >
                    <div class="h-32 w-36">
                      <img
                        class="h-full w-full rounded-lg object-cover"
                        src={item.imageUrl}
                        alt=""
                      />
                    </div>
                    <div class="p-5">
                      <span>
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight text-gray-700">
                          {item.name}
                        </h5>
                      </span>
                      <p class="mb-3 text-center font-semibold text-sm text-gray-700">
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConsultantListing;
