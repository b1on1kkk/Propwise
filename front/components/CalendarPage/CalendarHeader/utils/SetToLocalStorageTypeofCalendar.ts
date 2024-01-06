import type { TCalendarSettings } from "@/interfaces/interfaces";

export function SetToLocalStorageTypeofCalendar(item: TCalendarSettings) {
  localStorage.setItem("calendar_to_show", JSON.stringify(item));
}
