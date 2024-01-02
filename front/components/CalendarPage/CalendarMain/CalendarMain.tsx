// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { format, getDay, isSameMonth } from "date-fns";
import { months } from "@/constants/Months";
import { ColStartClasses } from "@/constants/ColStartClasses";
import { ChangeStatusChosenDate } from "@/utils/ChangeStatusChosenDate";

export default function CalendarMain() {
  const { extendedDays, currentMonth, setExtendedDays } =
    useGlobalCalendatContext();
  const { setChosenDay } = useGlobalModalStatus();

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
            return (
              <div
                key={idx}
                className={`border-1 h-60 text-[#56616b] font-semibold flex flex-col ${
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
                    setChosenDay(day);
                  }
                }}
              >
                <div className="inline-block m-2">
                  <time dateTime={format(day.day, "yyyy-mm-dd")}>
                    {format(day.day, "d")}
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
