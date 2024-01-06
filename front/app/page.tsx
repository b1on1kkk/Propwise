"use client";

import { useEffect, useState } from "react";

// components
import CalendarHeader from "@/components/CalendarPage/CalendarHeader/CalendarHeader";
import CalendarMain from "@/components/CalendarPage/CalendarMain/CalendarMain";
import CalendarDays from "@/components/CalendarPage/CalendarDays/CalendarDays";
import Loading from "@/components/Loading/Loading";

// context
import { CalendarContext } from "@/context/CalendarContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

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
import { GetEvents } from "@/API/GetUsersEvents";

// interfaces
import type { NewDays, TCalendarSettings } from "@/interfaces/interfaces";

function ShowTypeOfCalendar(type: TCalendarSettings | null): React.ReactNode {
  if (type) {
    const { text } = type;

    switch (text) {
      case "M":
        return <CalendarMain />;
      case "D":
        return <CalendarDays />;
      default:
        return <></>;
    }
  }

  return <Loading />;
}

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

  const { setEvents, user } = useGlobalModalStatus();

  useEffect(() => {
    setExtendedDays(CreateExtendDays(days));
    if (user.length > 0) {
      GetEvents(user[0].id, currentMonth).then((events) => setEvents(events));
    }
  }, [currentMonth, user]);

  const [showCalendar, setShowCalendar] = useState<TCalendarSettings | null>(
    null
  );

  return (
    <CalendarContext.Provider
      value={{
        extendedDays,
        currentMonth,
        setCurrentMonth,
        setExtendedDays,
        setShowCalendar
      }}
    >
      <CalendarHeader firstDayCurrentMonth={firstDayCurrentMonth} />
      {ShowTypeOfCalendar(showCalendar)}
    </CalendarContext.Provider>
  );
}
