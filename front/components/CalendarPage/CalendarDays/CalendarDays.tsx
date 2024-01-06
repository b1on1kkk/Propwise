"use client";

import { useEffect, useState } from "react";

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  parse,
  format
} from "date-fns";

import { useGlobalCalendatContext } from "@/context/CalendarContext";

import { TIME } from "@/constants/Time";

export default function CalendarDays() {
  // use in future
  const { currentMonth } = useGlobalCalendatContext();
  const firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const [currentWeekStart, setCurrentWeekStart] =
    useState(firstDayCurrentMonth);

  useEffect(() => {
    setCurrentWeekStart(firstDayCurrentMonth);
  }, [currentMonth]);

  const showNextWeek = () => {
    setCurrentWeekStart((prevWeekStart) => addWeeks(prevWeekStart, 1));
  };

  const showPreviousWeek = () => {
    setCurrentWeekStart((prevWeekStart) => subWeeks(prevWeekStart, 1));
  };

  const daysOfCurrentWeek = eachDayOfInterval({
    start: startOfWeek(currentWeekStart),
    end: endOfWeek(currentWeekStart)
  });

  // <button onClick={showNextWeek}>Next</button>
  // <button onClick={showPreviousWeek}>Prev</button>

  //

  const fakeArray = new Array(7).fill(0);

  return (
    <main className="flex-1 flex overflow-auto flex-col">
      <header>
        <div className="flex flex-1">
          <div className="w-28 py-3 text-[#56616b] px-2 font-semibold border-1">
            PST
          </div>
          {daysOfCurrentWeek.map((day, idx) => {
            return (
              <div
                className="flex-1 py-3 text-[#56616b] text-center font-semibold border-1"
                key={idx}
              >
                {format(day, "EEE")} {format(day, "d")}
              </div>
            );
          })}
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {TIME.map((time) => {
          return (
            <div className="flex">
              <div className="w-28 py-3 text-[#56616b] px-2 font-semibold border-1">
                {time}
              </div>
              {fakeArray.map((_) => {
                return <div className="flex-1 h-48 border-1">1</div>;
              })}
            </div>
          );
        })}
      </main>
    </main>
  );
}
