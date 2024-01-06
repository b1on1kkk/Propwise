// utils
import { format } from "date-fns";

// interfaces
import type { Events, NewDays } from "@/interfaces/interfaces";

export function FindChosenDayEvents(events: Events[], day: NewDays) {
  const dayEvents: Events[] = [];

  events.forEach((event) => {
    if (
      event.day === format(day.day, "d") &&
      event.month.split("-")[0] === day.month &&
      event.week_day === day.week_day
    )
      dayEvents.push(event);
  });

  return dayEvents;
}
