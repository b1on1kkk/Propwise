"use client";

import { createContext, useContext } from "react";

export interface NewDays {
  id: number;
  day: Date;
  month: string;
  week_day: string;
  createEvent: boolean;
}

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
