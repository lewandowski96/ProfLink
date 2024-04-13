const CompoTest = () => {
    return (
        <div>
            <h1>CompoTest</h1>
        </div>
    );
}

export default CompoTest;



{showDropdown && (
                    <div
                      id="dropdownSearch"
                      className="absolute z-10 mt-2 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
                    >
                      <ul
                        className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownSearchButton"
                      >
                        {cities.map((city) => (
                          <li key={city}>
                            <div className="relative flex flex-row place-content-start gap-5 items-baseline rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={city}
                                name="city"
                                type="radio"
                                value={city}
                                checked={selectedCity === city}
                                onChange={() => handleCitySelect(city)}
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