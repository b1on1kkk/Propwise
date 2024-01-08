"use client";

import { useEffect, useState } from "react";

// components
import CalendarHeaderButton from "@/components/CalendarHeaderButton/CalendarHeaderButton";
import {
  Calendar,
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
import { NextMonth, PrevMonth } from "./utils/NextAndPrevMonthControlles";
import { IsAnyDayChosen } from "./utils/IsAnyDayChosen";

export default function CalendarHeader({
  firstDayCurrentMonth
}: {
  firstDayCurrentMonth: Date;
}) {
  const { setCurrentMonth, currentMonth, extendedDays } =
    useGlobalCalendatContext();
  const {
    setCreateModalStatus,
    createModalStatus,
    storedLocalStorageValue,
    setLocalStorageValue
  } = useGlobalModalStatus();

  // use default calendar status
  const [moveTo, setMoveTo] = useState<string>(storedLocalStorageValue.move_to);

  const [isAnyDayChosenStatus, setIsAnyDayChosenStatus] = useState<boolean>(
    IsAnyDayChosen(extendedDays)
  );

  useEffect(() => {
    setIsAnyDayChosenStatus(IsAnyDayChosen(extendedDays));
  }, [extendedDays]);

  return (
    <div className="flex border-l-1 border-b-1 px-5 py-4">
      <div className="flex gap-1 items-center flex-1">
        <CalendarHeaderButton
          left_icon={<Calendar width={17} height={17} />}
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
                onClick={() => {
                  setLocalStorageValue({
                    ...item,
                    status: storedLocalStorageValue.status
                  });
                  setMoveTo(item.move_to);
                }}
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
            onClick={() => PrevMonth(setCurrentMonth, firstDayCurrentMonth)}
          >
            <ChevronLeft width={15} height={15} />
          </button>
        </div>

        <div>
          <button
            className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
            onClick={() => NextMonth(setCurrentMonth, firstDayCurrentMonth)}
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
          onClick={() => {
            if (isAnyDayChosenStatus) setCreateModalStatus(!createModalStatus);
          }}
          bg_color={`${isAnyDayChosenStatus ? "bg-[#009965]" : "bg-gray-400"}`}
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
