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
import type { Events, NewDays } from "@/interfaces/interfaces";
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

import { FilterEvents } from "@/utils/FilterEvents";

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

  // fetch events and store another some useful props
  const { data, refetch, isLoading, isError } = GetEvents(user, currentMonth);

  // create storage for events to filter it on client-side
  const [events, setEvents] = useState<Events[]>([]);

  // set as default value search query string
  const [filterQuery, setFilterQuery] = useState<string>(
    window.location.search
  );

  useEffect(() => {
    setExtendedDays(CreateExtendDays(days));
    refetch();
  }, [currentMonth, user]);

  useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  // filter only when filterquery changes or data (fetching events) changes
  useEffect(() => {
    FilterEvents(filterQuery, data, setEvents);
  }, [filterQuery, data]);

  return (
    <CalendarContext.Provider
      value={{
        events,
        isLoading,
        isError,
        refetch,
        extendedDays,
        currentMonth,
        // setters
        setCurrentMonth,
        setExtendedDays,
        setFilterQuery
      }}
    >
      <CalendarHeader firstDayCurrentMonth={firstDayCurrentMonth} />
      {ShowTypeOfCalendar(storedLocalStorageValue.text)}

      <ShowMoreEventsRightModal day={chosenToSeeDetailedInfDay} />
    </CalendarContext.Provider>
  );
}
