"use client";

import { useState } from "react";

// components
import CalendarHeaderButton from "@/components/CalendarHeaderButton/CalendarHeaderButton";
import {
  CalendarDays,
  SlidersHorizontalIcon,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Plus,
  ArrowDownCircle
} from "lucide-react";

// utils
import { getRightCalendarPosition } from "@/utils/getRightCalendarPosition";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function Home() {
  const [moveTo, setMoveTo] = useState<string>("41px");
  const { setCreateModalStatus, createModalStatus } = useGlobalModalStatus();

  return (
    <main className="flex-1">
      <header className="flex border-b-1">
        <div className="flex px-5 py-4 gap-1 items-center flex-1">
          <CalendarHeaderButton
            left_icon={<CalendarDays width={17} height={17} />}
            title="September"
            onClick={() => {}}
            right_icon={<ChevronDown width={12} height={12} />}
            bg_color="bg-white"
            text_color="text-[#56616b]"
          />

          <CalendarHeaderButton
            left_icon={<SlidersHorizontalIcon width={17} height={17} />}
            title="Filter"
            onClick={() => {}}
            bg_color="bg-white"
            text_color="text-[#56616b]"
          />

          {/* delimiter */}
          <div className="h-7 border-1"></div>
          {/*  */}

          <div className="flex py-2 bg-gray-100 rounded-lg relative select-none">
            {CALENDAR_SETTINGS.map((item, idx) => {
              return (
                <button
                  className={`font-semibold px-[14px] z-10 cursor-pointer text-[#56616b]`}
                  key={idx}
                  onClick={() => setMoveTo(item.move_to)}
                >
                  {item.text}
                </button>
              );
            })}
            <div
              className={`w-10 h-10 bg-white top-0 absolute border-1 rounded-lg ${getRightCalendarPosition(
                moveTo
              )} shadow-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]`}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div>
            <button
              className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
              onClick={() => {}}
            >
              <ChevronLeft width={15} height={15} />
            </button>
          </div>

          <div>
            <button
              className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
              onClick={() => {}}
            >
              <ChevronRight width={15} height={15} />
            </button>
          </div>

          {/* delimiter */}
          <div className="h-7 border-1"></div>
          {/*  */}

          <CalendarHeaderButton
            left_icon={<Plus width={17} height={17} />}
            title="Create"
            onClick={() => setCreateModalStatus(!createModalStatus)}
            bg_color="bg-green-600"
            text_color="text-white"
          />

          <CalendarHeaderButton
            right_icon={<ArrowDownCircle width={17} height={17} />}
            title="Export"
            onClick={() => {}}
            bg_color="bg-white"
            text_color="text-[#56616b]"
          />
        </div>
      </header>
      <main>table in future</main>
    </main>
  );
}
