import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";



export default function PostCatd(props) {
  const { details, callback } = props;
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);


  const formatDateFromTimestamp = (timestampString) => {
    const dateObject = new Date(timestampString);

    const year = dateObject.getFullYear(); // Get the year 
    const month = dateObject.getMonth() + 1; // Get the month 
    const date = dateObject.getDate(); // Get the date of the month

    // Pad the month and date with leading zeros if needed
    const paddedMonth = month < 10 ? `0${month}` : `${month}`;
    const paddedDate = date < 10 ? `0${date}` : `${date}`;

    // Combine year, month, and date into a single string
    const formattedDate = `${year}-${paddedDate}-${paddedMonth}`;

    return formattedDate;
  }


  function calculateTimeDifference(timestampString) {
    const currentDate = new Date();
    const providedDate = new Date(timestampString);

    const differenceInMilliseconds = currentDate - providedDate;

    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years}y`;
    } else if (months > 0) {
      return `${months}mo`;
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `now`;
    }
  }
  const showModel = () => {
    console.log("show model");
  }

  const onUpdate = async (updatedPost) => {
    console.log(updatedPost);
    try {
      const postId = updatedPost._id;

      const response = await fetch(`http://localhost:4000/api/post/edit/${postId}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log("Post Updated successfully");
        callback();
        handleCloseModel();

      }
    } catch (error) {
      console.error("Failed to delete post", error);
      handleCloseModel();
    }
  }
  const onDelete = async (postId) => {
    console.log(postId);
    try {

      const response = await fetch(`http://localhost:4000/api/post/remove/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        callback();
        handleCloseModel();

      }
    } catch (error) {
      console.error("Failed to delete post", error);
      handleCloseModel();
    }

  }

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenue, setShowMenue] = useState(false);
  const [updatedJobTitle, setUpdatedJobTitle] = useState(details.jobTitle);
  const [updatedLocations, setUpdatedLocations] = useState(details.locations);
  const [updatedSalary, setUpdatedSalary] = useState(details.salary);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleMenue = () => {
    setShowMenue(!showMenue);
  }
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  }

  const handleUpdate = () => {
    const updatedPost = {
      ...details,
      jobTitle: updatedJobTitle,
      locations: updatedLocations,
      salary: updatedSalary,
    };
    onUpdate(updatedPost);
    toggleModal();
  };
  const handleCloseModel = () => {
    setShowModal(false);
    setShowMenue(false);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="mx-3 my-3 flex max-w-xs flex-col rounded-lg bg-white p-3 shadow-lg md:mx-auto">
        <div className="flex h-fit w-full flex-row place-content-between">
          <img
            className="h-12 w-12 rounded-full object-cover shadow"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          />
          <div className="flex flex-row place-content-center">
            <h2 className=" mb-2 text-md font-semibold text-gray-900">
              {details.jobTitle}
            </h2>
          </div>

          <div className="flex flex-row items-start">
            <small className="text-sm text-gray-700">
              {calculateTimeDifference(details.updatedAt)}
            </small>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={toggleMenue}
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>

              {
                showMenue && (<div className="absolute right-5 bg-gray-200 w-fit h-fit p-5 rounded-lg shadow-2xl">

                  <div class="w-[95%] cursor-pointer rounded-lg bg-white p-2 text-xs hover:bg-slate-300 mb-2">
                    <div class="flex flex-row place-content-center items-center gap-2 text-blue-600 hover:text-blue-500" onClick={toggleModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-blue-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      edit
                    </div>
                  </div>

                  <div class="w-[95%] cursor-pointer rounded-lg bg-white p-2 text-xs hover:bg-slate-300">
                    <div class="flex flex-row place-content-center items-center gap-2 text-red-600 hover:text-red-500" onClick={toggleDeleteModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove
                    </div>
                  </div>
                </div>)
              }

            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col place-content-center items-start px-3 mt-4">
            <div className="flex flex-row gap-3 pb-1">
              <span className="text-xs font-semibold text-gray-700">
                Location:
              </span>
              <span className="text-xs"> {details.locations}</span>
            </div>
            <div className="flex flex-row gap-3 pb-1">
              <span className="text-xs font-semibold text-gray-700">
                Salary:
              </span>
              <span className="text-xs">{'Rs. ' + details.salary}</span>
            </div>
            <div className="flex flex-row gap-3 pb-1">
              <span className="text-xs font-semibold text-gray-700">From:</span>
              <span className="text-xs">
                {formatDateFromTimestamp(details.startTime)}{" "}
              </span>
              <span className="text-xs font-semibold">to</span>
              <span className="text-xs"> {formatDateFromTimestamp(details.endTime)}</span>
            </div>
            <div className="flex flex-row gap-3 pb-1">
              <span className="text-xs font-semibold text-gray-700">
                Application Submition:
              </span>
              <span className="text-xs">{details.selectedOption}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-row place-content-end items-center">
            <div className="mr-1 flex text-sm text-gray-700">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="mr-1 h-4 w-4"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="-mt-[3px]">{details.likes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Update */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-lg font-semibold mb-4">Update Post</h2>
            <input
              type="text"
              value={updatedJobTitle}
              onChange={(e) => setUpdatedJobTitle(e.target.value)}
              placeholder="Job Title"
              className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
            />
            <input
              type="text"
              value={updatedLocations}
              onChange={(e) => setUpdatedLocations(e.target.value)}
              placeholder="Locations"
              className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
            />
            <input
              type="text"
              value={updatedSalary}
              onChange={(e) => {
                const inputSalary = e.target.value;
                if (/^\d{0,10}(\.\d{0,2})?$/.test(inputSalary)) {
                  setUpdatedSalary(inputSalary);
                }
              }}
              placeholder="Salary"
              className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                onClick={handleCloseModel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal for delet */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-lg font-semibold mb-4">Delete Post</h2>
            <h2 className="text-sm text-red-500 mb-4">{details.jobTitle}</h2>
            <span className="">Are you sure you want to delete this?</span>
            <div className="flex justify-between mt-5">
              <button
                onClick={() => onDelete(details._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}