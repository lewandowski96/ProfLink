import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ViewProfilesModal from "./ViewProfilesModal";

const CompanyListing = () => {
  const user = useSelector((state) => state.user.user);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [originalCompanies, setOriginalCompanies] = useState([]); // Store the original list of companies
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const cities = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Malabe",
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

  const [companies, setCompanies] = useState([]);

  const openModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setShowModal(false);
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
        setCompanies(json);
        setOriginalCompanies(json); // Save the original list of companies
        console.log(json);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [user]);

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
    setSearchQuery(event.target.value);
    setSelectedCity(null); // Reset selected city when searching
    if (event.target.value === "") {
      // If search query is empty, reset the companies list to the original list
      setCompanies(originalCompanies);
    }
  };

  const filteredCompanies = cities
    ? cities.filter((city) => {
        const matchesCity = !selectedCity || city === selectedCity;

        const matchesQuery =
          !searchQuery ||
          city.toLowerCase().includes(searchQuery?.toLowerCase());

        const idle = !searchQuery || searchQuery.length <= 0;

        return (matchesCity && matchesQuery) || idle;
      })
    : [];

  const handleSubmit = () => {
    const filteredResult = originalCompanies.filter((company) => {
      return (
        (selectedCity === null || company?.locationsName === selectedCity) &&
        (nameSearch === "" ||
          company?.CompanyName?.toLowerCase().includes(
            nameSearch?.toLowerCase()
          ))
      );
    });
    setCompanies(filteredResult);
  };

  return (
    <>
      <Navbar />
      <div className="company-listing">
        <h2 className="relative text-balck mx-auto mt-4 mb-6 text-center text-4xl font-extrabold font-mono">
          Companies
        </h2>

        {showModal && (
          <ViewProfilesModal company={selectedCompany} onClose={closeModal} />
        )}

        <div className="sub w-full flex ml-6 mr-6">
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
                    placeholder="Search for jobs..."
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
                    {selectedCity || "Location"}
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

            <div className="w-full px-20 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 h-[500px] overflow-auto py-5">
              {companies &&
                companies.map((item, index) => (
                  <div
                    key={index}
                    className="w-56 h-72 rounded-lg border flex flex-col items-center border-gray-200 bg-white shadow pt-10 px-4 cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    <div class="h-32 w-36">
                      <img
                        class="h-full w-full rounded-lg object-cover"
                        src={item.file}
                        alt=""
                      />
                    </div>
                    <div class="p-5">
                      <span>
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight text-gray-700">
                          {item.CompanyName}{" "}
                        </h5>
                      </span>
                      <p class="mb-3 text-center font-semibold text-sm text-gray-700">
                        {item.locationsName}{" "}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyListing;
