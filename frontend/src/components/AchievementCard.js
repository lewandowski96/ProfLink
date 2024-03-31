import React from "react";

export default function AchievementCard(props) {
  return (
    <div>
      <div class="mx-3 my-3 flex flex-col place-content-start max-w-full rounded-lg bg-white p-5 shadow-lg">
        <h2 class="mb-2 text-lg font-semibold text-gray-900">
          Achievements...
        </h2>

        <div class="px-3">
          <h2 class="text-md float-left mb-2 font-semibold text-gray-900">
            Awards:
          </h2>
          <br />
          <br />
          <ul class="list-disc">
            <li class="mb-1 text-justify text-xs text-gray-900">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </li>
            <li class="mb-1 text-justify text-xs text-gray-900">
              Employee of the month December 2025
            </li>
            <li class="mb-1 text-justify text-xs text-gray-900">
              Employee of the month December 2025
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
