"use client";

import { useState } from "react";

// components
import CalendarHeader from "@/components/CalendarPage/CalendarHeader/CalendarHeader";
import CalendarMain from "@/components/CalendarPage/CalendarMain/CalendarMain";

// utils
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfToday,
  endOfWeek,
  startOfWeek,
  parse
} from "date-fns";

// context
import { CalendarContext } from "@/context/CalendarContext";

export default function Home() {
  const today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth))
  });

  return (
    <CalendarContext.Provider
      value={{
        days: days,
        currentMonth: currentMonth,
        setCurrentMonth: setCurrentMonth
      }}
    >
      <CalendarHeader firstDayCurrentMonth={firstDayCurrentMonth} />

      <CalendarMain />
    </CalendarContext.Provider>
  );
}
