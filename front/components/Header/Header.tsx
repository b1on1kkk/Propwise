"use client";

import { useState } from "react";

// components
import { Search, Bell } from "lucide-react";

// constants
import { HOMEPAGE_HEADER } from "@/constants/HomepageHeader";

export default function Header() {
  const [moveTo, setMoveTo] = useState<string>("-2px");

  return (
    <header className="p-3 py-[9px] border-b-1 flex items-center border-l-1">
      <div className="flex flex-1">
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
      </div>
      <div className="flex gap-2">
        <div className="flex items-center bg-gray-100 border-1 px-3 rounded-lg gap-2">
          <Search width={18} height={18} className="opacity-70" />
          <form>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none bg-inherit w-60 placeholder:font-semibold"
            />
          </form>
        </div>
        <div className="flex items-center justify-center p-3 border-1 rounded-lg">
          <Bell width={16} height={16} fill="black"></Bell>
        </div>
      </div>
    </header>
  );
}
