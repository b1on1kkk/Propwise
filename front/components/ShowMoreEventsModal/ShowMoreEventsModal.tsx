"use client";

import { useState, useEffect } from "react";

// components
import EventCard from "./EventCard/EventCard";
import { Calendar, X } from "lucide-react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// hooks
import { useOutsideClick } from "@/hooks/useOutsideClick ";

// utils
import { FindChosenDayEvents } from "@/utils/FindChosenDayEvents";

// interfaces
import type { Events, TShowMoreEventsModal } from "@/interfaces/interfaces";

export default function ShowMoreEventsModal({ day }: TShowMoreEventsModal) {
  const [dayEvents, setDayEvents] = useState<Events[]>([]);

  const { events, detailedModalStatus, setDetailedModalStatus } =
    useGlobalModalStatus();

  const handleClickOutside = () => {
    if (detailedModalStatus) setDetailedModalStatus(!detailedModalStatus);
  };

  useEffect(() => {
    if (day) {
      setDayEvents(FindChosenDayEvents(events, day));
    }
  }, [day]);

  return (
    <ModalWrapper status={detailedModalStatus}>
      <div
        className="w-[450px] h-[450px] bg-white rounded-lg shadow-2xl flex flex-col"
        ref={useOutsideClick(handleClickOutside)}
      >
        <header className="px-5 py-3 border-b-2 flex drop-shadow">
          <span className="font-semibold flex-1 text-lg">
            Detailed Events Information
          </span>
          <button
            onClick={() => {
              setDetailedModalStatus(!detailedModalStatus);
            }}
          >
            <X color="#56616b" />
          </button>
        </header>

        <main className="p-5 flex flex-col gap-3 flex-1 overflow-auto">
          {dayEvents.length > 0 ? (
            <>
              {dayEvents.map((event, idx) => {
                return (
                  <EventCard
                    key={idx}
                    name={event.event_name}
                    week_day={event.week_day}
                    month={event.month}
                    day={event.day}
                    time_from={event.time_from}
                    time_to={event.time_to}
                    description={event.description}
                    link={event.link}
                  />
                );
              })}
            </>
          ) : (
            <div className="flex flex-col text-[#56616b] items-center justify-center flex-1 gap-3">
              <Calendar width={70} height={70} />
              <div className="text-xl font-semibold">
                {"There are no events yet :("}
              </div>
            </div>
          )}
        </main>
      </div>
    </ModalWrapper>
  );
}
