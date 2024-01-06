"use client";

// components
import { MoreHorizontal } from "lucide-react";
import SmallEventCard from "./SmallEventCard/SmallEventCard";

// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { format, getDay, isSameMonth } from "date-fns";
import { months } from "@/constants/WeekDays";
import { ColStartClasses } from "@/constants/ColStartClasses";
import { ChangeStatusChosenDate } from "@/utils/ChangeStatusChosenDate";
import { ShowMoreDateInf } from "@/utils/ShowMoreDateInf";

export default function CalendarMain() {
  const { extendedDays, currentMonth, setExtendedDays } =
    useGlobalCalendatContext();
  const {
    setChosenDay,
    events,
    detailedModalStatus,
    setChosenToSeeDetailedInfDay,
    setDetailedModalStatus
  } = useGlobalModalStatus();

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
          {extendedDays.map((day, idx) => {
            let counter = 0;

            return (
              <div
                key={idx}
                className={`border-1 h-60 text-[#56616b] font-semibold flex flex-col justify-between p-3 transition-all duration-200 ${
                  idx === 0 && ColStartClasses[getDay(day.day)]
                } ${!isSameMonth(day.day, currentMonth) && "bg-gray-50"} ${
                  day.create_event && "border-green-500"
                } ${
                  day.mouse_over && !day.create_event && "shadow-inner"
                } transition-all duration-200 ease-in`}
                onClick={() => {
                  if (isSameMonth(day.day, currentMonth)) {
                    ChangeStatusChosenDate(
                      extendedDays,
                      day,
                      setExtendedDays,
                      currentMonth
                    );
                    setChosenDay({
                      ...day,
                      month: format(day.day, "MMMM-yyyy")
                    });
                  }
                }}
                onMouseEnter={() => {
                  ShowMoreDateInf(
                    extendedDays,
                    day,
                    setExtendedDays,
                    currentMonth
                  );
                }}
                onMouseLeave={() => {
                  ShowMoreDateInf(
                    extendedDays,
                    day,
                    setExtendedDays,
                    currentMonth
                  );
                }}
              >
                <div className="flex justify-between items-center min-h-7">
                  <time dateTime={format(day.day, "yyyy-mm-dd")}>
                    {format(day.day, "d")}
                  </time>

                  {day.mouse_over && (
                    <button
                      className={`p-1 border-1 rounded-lg text-[#b5b5b5] hover:text-[#696969] active:translate-y-0.5 shadow cursor-pointer`}
                      onClick={() => {
                        setChosenToSeeDetailedInfDay(day);
                        setDetailedModalStatus(!detailedModalStatus);
                      }}
                    >
                      <MoreHorizontal width={18} height={18} />
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {events.map((event, idx) => {
                    if (
                      event.month === currentMonth &&
                      event.day === format(day.day, "d") &&
                      event.week_day === day.week_day
                    ) {
                      if (counter < 1) {
                        counter++;
                        return (
                          <SmallEventCard
                            key={idx}
                            link={event.link}
                            name={event.event_name}
                            description={event.description}
                          />
                        );
                      }
                      counter++;
                    }
                  })}

                  {counter >= 1 && counter - 1 !== 0 && (
                    <div className="p-1 border-2 border-dashed rounded-lg text-center border-white bg-[#009965] text-white hover:bg-green-600 transition-all duration-200 ease-in">
                      +{counter - 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
