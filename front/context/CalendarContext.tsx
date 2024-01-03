"use client";

import { createContext, useContext } from "react";
import type { NewDays } from "@/interfaces/interfaces";

export interface TCalendarContent {
  extendedDays: NewDays[];
  currentMonth: string;
  setCurrentMonth: (c: string) => void;
  setExtendedDays: (c: NewDays[]) => void;
}

export const CalendarContext = createContext<TCalendarContent>({
  extendedDays: [],
  currentMonth: "",
  setCurrentMonth: () => {},
  setExtendedDays: () => {}
});

export const useGlobalCalendatContext = () => useContext(CalendarContext);
