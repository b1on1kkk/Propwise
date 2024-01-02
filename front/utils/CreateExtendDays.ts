import { format } from "date-fns";
import type { NewDays } from "@/context/CalendarContext";

export function CreateExtendDays(days: Date[]) {
  const newDays: NewDays[] = [];

  days.forEach((day) => {
    newDays.push({
      id: parseInt(format(day, "d")),
      day: day,
      month: format(day, "MMMM"),
      week_day: format(day, "EEEE"),
      createEvent: false
    });
  });

  return newDays;
}
