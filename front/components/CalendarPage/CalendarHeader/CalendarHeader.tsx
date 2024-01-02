"use client";

import { useState } from "react";

// components
import CalendarHeaderButton from "@/components/CalendarHeaderButton/CalendarHeaderButton";
import {
  CalendarDays,
  SlidersHorizontalIcon,
  ChevronRight,
  ChevronLeft,
  Plus,
  ArrowDownCircle
} from "lucide-react";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { useGlobalCalendatContext } from "@/context/CalendarContext";

// utils
import { add, format } from "date-fns";

export default function CalendarHeader({
  firstDayCurrentMonth
}: {
  firstDayCurrentMonth: Date;
}) {
  const { setCurrentMonth, currentMonth } = useGlobalCalendatContext();
  const { setCreateModalStatus, createModalStatus } = useGlobalModalStatus();

  const [moveTo, setMoveTo] = useState<string>("41px");

  function NextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
  }

  function PrevMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
  }

  return (
    <div className="flex border-l-1 border-b-1 px-5 py-4">
      <div className="flex gap-1 items-center flex-1">
        <CalendarHeaderButton
          left_icon={<CalendarDays width={17} height={17} />}
          title={currentMonth}
          onClick={() => {}}
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
            className={`w-10 h-10 bg-white top-0 absolute border-1 rounded-lg ${
              moveTo === "0px"
                ? "right-0"
                : moveTo === "41px"
                ? "right-41px"
                : moveTo === "80px"
                ? "right-80px"
                : "right-0"
            } shadow-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]`}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div>
          <button
            className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
            onClick={PrevMonth}
          >
            <ChevronLeft width={15} height={15} />
          </button>
        </div>

        <div>
          <button
            className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
            onClick={NextMonth}
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
    </div>
  );
}
