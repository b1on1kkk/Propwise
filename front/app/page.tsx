"use client";

import { useEffect, useState } from "react";

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
import { CreateExtendDays } from "@/utils/CreateExtendDays";
import type { NewDays } from "@/interfaces/interfaces";

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

  const [extendedDays, setExtendedDays] = useState<NewDays[]>(
    CreateExtendDays(days)
  );

  useEffect(() => {
    setExtendedDays(CreateExtendDays(days));
  }, [currentMonth]);

  return (
    <CalendarContext.Provider
      value={{
        extendedDays,
        currentMonth,
        setCurrentMonth,
        setExtendedDays
      }}
    >
      <CalendarHeader firstDayCurrentMonth={firstDayCurrentMonth} />

      <CalendarMain />
    </CalendarContext.Provider>
  );
}
