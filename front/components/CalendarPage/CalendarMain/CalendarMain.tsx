"use client";

// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";

// utils
import { format, getDay, isSameMonth, startOfToday } from "date-fns";
import { months } from "@/constants/Months";
import { ColStartClasses } from "@/constants/ColStartClasses";

export default function CalendarMain() {
  const { days, currentMonth } = useGlobalCalendatContext();

  return (
    <main className="flex-1 overflow-auto">
      <div>
        <div className="flex">
          {months.map((month) => {
            return (
              <div
                key={month}
                className="flex-1 py-3 text-[#56616b] text-center font-semibold border-1"
              >
                {month}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 grid-rows-5">
          {days.map((day, idx) => {
            return (
              <div
                key={idx}
                className={`border-1 h-60 text-[#56616b] font-semibold ${
                  idx === 0 && ColStartClasses[getDay(day)]
                } ${!isSameMonth(day, currentMonth) && "bg-gray-50"}`}
              >
                <div className="inline-block m-2">
                  <time dateTime={format(day, "yyyy-mm-dd")}>
                    {format(day, "d")}
                  </time>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
