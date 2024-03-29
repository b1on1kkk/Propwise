import { isSameMonth } from "date-fns";

import type { NewDays } from "@/interfaces/interfaces";

export function ChangeStatusChosenDate(
  days: NewDays[],
  chosen: NewDays,
  setExtendedDays: (c: NewDays[]) => void,
  currentMonth: string
) {
  setExtendedDays([
    ...days.map((day) => {
      if (day.id === chosen.id && isSameMonth(day.day, currentMonth))
        return { ...day, create_event: !chosen.create_event };
      return { ...day, create_event: false };
    })
  ]);
}
