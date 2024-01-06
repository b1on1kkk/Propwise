// utils
import { isSameMonth } from "date-fns";

// interface
import type { NewDays } from "@/interfaces/interfaces";

export function ShowMoreDateInf(
  days: NewDays[],
  chosen: NewDays,
  setter: (c: NewDays[]) => void,
  currentMonth: string
) {
  setter([
    ...days.map((day) => {
      if (day.id === chosen.id && isSameMonth(day.day, currentMonth))
        return { ...day, mouse_over: !chosen.mouse_over };
      return { ...day, mouse_over: false };
    })
  ]);
}
