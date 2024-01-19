"use client";

import { useEffect, useState } from "react";

// components
import CalendarHeader from "@/components/CalendarPage/CalendarHeader/CalendarHeader";
import CalendarMain from "@/components/CalendarPage/CalendarMain/CalendarMain";
import CalendarDays from "@/components/CalendarPage/CalendarDays/CalendarDays";

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
import { GetEvents } from "@/API/GetEvents";

// interfaces
import type { NewDays } from "@/interfaces/interfaces";
import ShowMoreEventsRightModal from "@/components/ShowMoreEventsRightModal/ShowMoreEventsRightModal";

function ShowTypeOfCalendar(type: string): React.ReactNode {
  switch (type) {
    case "M":
      return <CalendarMain />;
    case "D":
      return <CalendarDays />;
    default:
      return <></>;
  }
}

export default function Home() {
  // create calendar layout
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
  //

  const { user, storedLocalStorageValue, chosenToSeeDetailedInfDay } =
    useGlobalModalStatus();

  const { data, refetch, isLoading, isError } = GetEvents(user, currentMonth);

  useEffect(() => {
    setExtendedDays(CreateExtendDays(days));
    refetch();
  }, [currentMonth, user]);

  return (
    <CalendarContext.Provider
      value={{
        events: data,
        isLoading,
        isError,
        refetch,
        extendedDays,
        currentMonth,
        setCurrentMonth,
        setExtendedDays
      }}
    >
      <CalendarHeader firstDayCurrentMonth={firstDayCurrentMonth} />
      {ShowTypeOfCalendar(storedLocalStorageValue.text)}

      <ShowMoreEventsRightModal day={chosenToSeeDetailedInfDay} />
    </CalendarContext.Provider>
  );
}
