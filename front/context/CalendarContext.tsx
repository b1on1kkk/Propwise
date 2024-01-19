"use client";

import { createContext, useContext } from "react";
import type { NewDays, Events } from "@/interfaces/interfaces";
import type {
  QueryObserverResult,
  RefetchOptions
} from "@tanstack/react-query";

export interface TCalendarContent {
  events: Events[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Events[] | undefined, Error>> | undefined;
  extendedDays: NewDays[];
  currentMonth: string;
  setCurrentMonth: (c: string) => void;
  setExtendedDays: (c: NewDays[]) => void;
}

export const CalendarContext = createContext<TCalendarContent>({
  events: undefined,
  isLoading: false,
  isError: false,
  refetch: () => {
    return new Promise<QueryObserverResult<Events[] | undefined, Error>>(
      (resolve, reject) => {}
    );
  },
  extendedDays: [],
  currentMonth: "",
  setCurrentMonth: () => {},
  setExtendedDays: () => {}
});

export const useGlobalCalendatContext = () => useContext(CalendarContext);
