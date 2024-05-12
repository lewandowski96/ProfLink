import React from "react";

export default function AchievementCard(props) {
  const { achievements } = props;

  console.log("Achievements:", achievements); // Check if achievements are passed correctly


  return (
    <div>
      <div className="mx-3 my-3 flex flex-col place-content-start max-w-full rounded-lg bg-slate-300 p-5 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Achievements...
        </h2>
        <div className="px-3 w-fit">
          <h2 className="text-md float-left mb-2 font-semibold text-gray-900">
            Awards:
          </h2>
          <br />
          <br />
          <ul className="list-disc">
            {achievements?.map((achievement, index) => (
              <li key={index} className="text-md text-gray-900">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}