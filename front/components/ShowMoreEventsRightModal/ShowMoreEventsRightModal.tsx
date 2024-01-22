"use client";

import { useEffect, useState } from "react";

// components
import { X, Calendar } from "lucide-react";
import EventCard from "./EventCard/EventCard";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import SharingEventModal from "../SharingEventModal/SharingEventModal";

// hooks
import { useOutsideClick } from "@/hooks/useOutsideClick ";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { FindChosenDayEvents } from "@/utils/FindChosenDayEvents";
import { useGlobalCalendatContext } from "@/context/CalendarContext";
import { useDisclosure } from "@nextui-org/react";

// interfaces
import type { Events, TShowMoreEventsModal } from "@/interfaces/interfaces";

export default function ShowMoreEventsRightModal({
  day
}: TShowMoreEventsModal) {
  const [dayEvents, setDayEvents] = useState<Events[]>([]);

  const { detailedModalStatus, setDetailedModalStatus } =
    useGlobalModalStatus();

  const { events } = useGlobalCalendatContext();

  const handleClickOutside = () => {
    if (detailedModalStatus) setDetailedModalStatus(!detailedModalStatus);
  };

  useEffect(() => {
    if (day && events) setDayEvents(FindChosenDayEvents(events, day));
  }, [day]);

  // open/close modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // save chosen event to share it
  const [chosenEvent, setChosenEvent] = useState<Events | null>(null);

  return (
    <ModalWrapper
      status={detailedModalStatus}
      className="items-center justify-end"
    >
      <div
        className="h-screen w-[400px] bg-white shadow-rme_shadow flex flex-col animate-overlay_motion_anim dark:bg-slate-900"
        ref={useOutsideClick(handleClickOutside)}
      >
        <header className="px-5 py-3 border-b-2 flex dark:border-dark_border">
          <span className="font-semibold flex-1 text-lg dark:text-dark_text">
            Detailed Event Information
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
                    event={event}
                    onShareClick={() => {
                      setDetailedModalStatus(!detailedModalStatus);
                      onOpen();
                      setChosenEvent(event);
                    }}
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

      {/* sharing modal */}
      <SharingEventModal
        isOpen={isOpen}
        onClose={onClose}
        chosenEvent={chosenEvent}
        detailedModalStatus={detailedModalStatus}
        setDetailedModalStatus={setDetailedModalStatus}
      />
      {/*  */}
    </ModalWrapper>
  );
}
