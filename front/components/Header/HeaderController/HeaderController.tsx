"use client";

import { useState } from "react";

import { HOMEPAGE_HEADER } from "@/constants/HomepageHeader";

export default function HeaderController() {
  const [moveTo, setMoveTo] = useState<string>("-2px");

  return (
    <div className="flex py-2 bg-gray-100 rounded-lg relative select-none z-10">
      {HOMEPAGE_HEADER.map((item, idx) => {
        return (
          <button
            className={`font-semibold px-10 z-10 cursor-pointer text-[#56616b]`}
            key={idx}
            onClick={() => setMoveTo(item.move_to)}
          >
            {item.text}
          </button>
        );
      })}
      <div
        className={`w-88 h-10 bg-white top-0 absolute border-1 rounded-lg ${
          moveTo === "-2"
            ? "right-minus"
            : moveTo === "248px"
            ? "right-248px"
            : moveTo === "165px"
            ? "right-165px"
            : moveTo === "84px"
            ? "right-84px"
            : "right-minus"
        } shadow-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]`}
      />
    </div>
  );
}
