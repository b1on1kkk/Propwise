import type { NewDays } from "@/context/CalendarContext";
import { isSameMonth } from "date-fns";

export function ChangeStatusChosenDate(
  days: NewDays[],
  chosen: NewDays,
  setter: (c: NewDays[]) => void,
  currentMonth: string
) {
  setter([
    ...days.map((day) => {
      if (day.id === chosen.id && isSameMonth(day.day, currentMonth))
        return { ...day, createEvent: !chosen.createEvent };
      return { ...day, createEvent: false };
    })
  ]);
}
