import AchievementCard from "../components/AchievementCard";
import PostCatd from "../components/PostCatd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function ViewProfilesModal({ company, onClose }) {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user)?.user;

  console.log(user);

  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(false);

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profiles/company/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setProfile(json);
      }
    };

    const fetchPosts = async () => {
      const response = await fetch("/api/post/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setPost(json);
      }
    };

    if (user) {
      fetchProfile();
      fetchPosts();
    }
  }, [user, refreshState]);

  // if (!company) {
  //   return null;
  // }

  const handleRefresh = () => {
    console.log("Refreshing....");
    setRefreshState(!refreshState);
  };

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
      name: "Company A",
      location: "Hambantota",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Company B",
      location: "Jaffna",
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

  const postNewJob = () => {
    console.log("Post new job");
    navigate("postjob");
  };

  const filteredCompanies = cities
    ? cities.filter((city) => {
        const matchesCity = !selectedCity || city === selectedCity;

        const matchesQuery =
          !searchQuery ||
          city.toLowerCase().includes(searchQuery.toLowerCase());

        const idle = !searchQuery || searchQuery.length <= 0;

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

  const getCleanUrl = (url) => {
    if (!url) return;
    // Remove 'http://', 'https://', 'ftp://' from the URL
    let cleanUrl = url.replace(/^(https?|ftp):\/\//, "");
    return cleanUrl;
  };

  const date = new Date(company?.foundedYear);
  const year = date.getFullYear();

  console.log("debug"+company.achievements.length)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full h-full p-8">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full mx-auto rounded-lg shadow-lg z-50 h-full ">
        <div className="relative pt-12">
          <button
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 "
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className=" rounded-lg px-6 py-4 overflow-auto h-[79vh]">
            <div className="relative w-full rounded-xl bg-gray-400 px-8 py-8 shadow-lg">
              <div className="flex flex-col gap-10">
                <div className="mb-5 flex flex-row">
                  <h1 className="text-balck absolute left-36 right-36 top-0 mr-4 mt-4 text-center text-2xl font-semibold">
                    {company?.CompanyName}
                  </h1>
                  <div className="absolute right-5 top-5 mr-4 mt-4">
                    <button className="border-black-900 rounded-full border-black bg-blue-200 px-4 py-1 text-sm font-semibold text-blue-800 outline-black hover:border-transparent hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                      Follow
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row place-content-evenly items-center">
                    <div className="h-60 w-60 border-2 border-black p-1">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          company?.file ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="Woman's Face"
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="relative flex flex-col items-center gap-6">
                        <div className="flex items-center">
                          <svg
                            className="me-1 h-4 w-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="me-1 h-4 w-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="me-1 h-4 w-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="me-1 h-4 w-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="me-1 h-4 w-4 text-gray-300 dark:text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Reveiws
                          </p>
                        </div>

                        <div className="relativew-30 max-w-md rounded-lg bg-slate-300 p-4 shadow sm:p-8 dark:bg-gray-800">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-10">
                              <span className="text-left font-medium text-gray-900 dark:text-white w-24">
                                Website
                              </span>
                              <a
                                className="text-left font-semibold text-gray-600 dark:text-white underline"
                                href={company?.website}
                                target="_blank"
                              >
                                {getCleanUrl(company?.website)}
                              </a>
                            </div>
                            <div className="flex flex-row gap-10">
                              <span className="text-left font-medium text-gray-900 dark:text-white w-24">
                                Locations
                              </span>
                              <span className="text-left font-semibold text-gray-600 dark:text-white">
                                {company?.locationsName}
                              </span>
                            </div>
                            <div className="flex flex-row gap-10">
                              <span className="text-left font-medium text-gray-900 dark:text-white w-24">
                                Members
                              </span>
                              <span className="text-left font-semibold text-gray-600 dark:text-white">
                                {company?.members}
                              </span>
                            </div>
                            <div className="flex flex-row gap-10">
                              <span className="text-left font-medium text-gray-900 dark:text-white w-24">
                                Founded
                              </span>
                              <span className="text-left font-semibold text-gray-600 dark:text-white">
                                {company && year}
                              </span>
                            </div>
                            <div className="flex flex-row gap-10">
                              <span className="text-left font-medium text-gray-900 dark:text-white w-24">
                                Industry
                              </span>
                              <span className="text-left font-semibold text-gray-600 dark:text-white">
                                {company?.industry}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {company?.achievements?.length > 0 && (
                      <div className="w-96 rounded-xl p-2 flex flex-col gap-10">
                        <AchievementCard achievements={company?.achievements} />
                      </div>
                    )}
                  </div>
                  <div className="mt-10 text-center">
                    <p>{company?.about}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col mt-10 gap-4 pb-10">
              <div className="flex flex-col grow bg-stone-500 rounded-xl pb-10 order-2">
                <h1 className="mb-2 mt-5 pl-10 text-lg font-semibold text-gray-900">
                  Currently posted jobs...
                </h1>

                <div className="flex flex-row place-content-evenly">
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
                      // onChange={handleNameSearch}
                      // value={nameSearch}
                      required
                    />
                  </div>

                  <div className="mt-3">
                    <button
                      id="dropdownSearchButton"
                      data-dropdown-toggle="dropdownSearch"
                      // onClick={() => setShowDropdown(!showDropdown)}
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
                          <label
                            htmlFor="input-group-search"
                            className="sr-only"
                          >
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

                <div className="w-full px-5 py-5 h-[50vh] grid grid-cols-1 md:grid-cols-2 overflow-auto scrollbar-style">
                  {post.map((item) => {
                    return <PostCatd details={item} callback={handleRefresh} />;
                  })}
                </div>
              </div>
            </div>
            {/* <div className="px-6 py-4 overflow-auto h-[79vh]">
              <h2 className="text-2xl font-bold mb-4">{company.CompanyName}</h2>
              <div className="mb-4">
                <img
                  src={company.file}
                  alt={company.CompanyName}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-lg mb-2">
                <strong>About:</strong>{" "}
                {company.about || "No details provided."}
              </p>
              <p className="text-lg mb-2">
                <strong>Founded Year:</strong>{" "}
                {new Date(company.foundedYear).getFullYear()}
              </p>
              <p className="text-lg mb-2">
                <strong>Industry:</strong> {company.industry}
              </p>
              <p className="text-lg mb-2">
                <strong>Location:</strong> {company.locationsName}
              </p>
              <p className="text-lg mb-2">
                <strong>Website:</strong>{" "}
                <a
                  href={company.website}
                  className="text-blue-500 hover:underline"
                >
                  {company.website}
                </a>
              </p>
              <p className="text-lg mb-2">
                <strong>Members:</strong> {company.members}
              </p>
              <div className="text-lg mb-2">
                <strong>Achievements:</strong>

                <AchievementCard achievements={company.achievements} />
                <ul className="list-disc ml-5">
                  {company.achievements.map((ach, index) => (
                    <li key={index}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
