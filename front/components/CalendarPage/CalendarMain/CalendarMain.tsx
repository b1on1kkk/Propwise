// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { format, getDay, isSameMonth } from "date-fns";
import { months } from "@/constants/Months";
import { ColStartClasses } from "@/constants/ColStartClasses";
import { ChangeStatusChosenDate } from "@/utils/ChangeStatusChosenDate";

import { GraduationCap, MoreVertical } from "lucide-react";

export default function CalendarMain() {
  const { extendedDays, currentMonth, setExtendedDays } =
    useGlobalCalendatContext();
  const { setChosenDay, events } = useGlobalModalStatus();

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
                className={`border-1 h-60 text-[#56616b] font-semibold flex flex-col justify-between p-3 ${
                  idx === 0 && ColStartClasses[getDay(day.day)]
                } ${!isSameMonth(day.day, currentMonth) && "bg-gray-50"} ${
                  day.createEvent && "border-green-500"
                }`}
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
              >
                <div className="inline-block">
                  <time dateTime={format(day.day, "yyyy-mm-dd")}>
                    {format(day.day, "d")}
                  </time>
                </div>

                <div className="flex flex-col gap-2">
                  {events.map((event) => {
                    if (
                      event.month === currentMonth &&
                      event.day === format(day.day, "d") &&
                      event.week_day === day.week_day
                    ) {
                      if (counter < 1) {
                        counter++;
                        return (
                          <div className="flex flex-col border-1 shadow p-2 rounded-lg gap-1 border-green-600">
                            <div className="flex gap-3 items-center">
                              <div>
                                <GraduationCap
                                  width={20}
                                  height={20}
                                  color="rgb(22 163 74)"
                                />
                              </div>

                              <div className="text-black flex-1">
                                {event.eventName}
                              </div>

                              <div>
                                <MoreVertical width={18} height={18} />
                              </div>
                            </div>

                            <div className="text-sm">{event.description}</div>
                          </div>
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
