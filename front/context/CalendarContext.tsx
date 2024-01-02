"use client";

import { createContext, useContext } from "react";

export interface TCalendarContent {
  days: Date[];
  currentMonth: string;
  setCurrentMonth: (c: string) => void;
}

export const CalendarContext = createContext<TCalendarContent>({
  days: [],
  currentMonth: "",
  setCurrentMonth: () => {}
});

export const useGlobalCalendatContext = () => useContext(CalendarContext);
