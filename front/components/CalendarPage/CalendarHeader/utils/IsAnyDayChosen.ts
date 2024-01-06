import type { NewDays } from "@/interfaces/interfaces";

export function IsAnyDayChosen(extendedDays: NewDays[]): boolean {
  if (extendedDays.findIndex((day) => day.create_event === true) !== -1)
    return true;

  return false;
}
