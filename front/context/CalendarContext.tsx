"use client";

import { createContext, useContext } from "react";
import type { NewDays, TCalendarSettings } from "@/interfaces/interfaces";

export interface TCalendarContent {
  extendedDays: NewDays[];
  currentMonth: string;
  setCurrentMonth: (c: string) => void;
  setExtendedDays: (c: NewDays[]) => void;
  setShowCalendar: (c: TCalendarSettings) => void;
}

export const CalendarContext = createContext<TCalendarContent>({
  extendedDays: [],
  currentMonth: "",
  setCurrentMonth: () => {},
  setExtendedDays: () => {},
  setShowCalendar: () => {}
});

export const useGlobalCalendatContext = () => useContext(CalendarContext);
