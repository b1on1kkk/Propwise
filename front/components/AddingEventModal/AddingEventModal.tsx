"use client";

// components
import CreateEventInputWrapper from "../CreateEvent/CreateEventInputWrapper/CreateEventInputWrapper";
import CreateEventTimeInput from "../CreateEvent/CreateEventTimeInput/CreateEventTimeInput";
import { X, Calendar, ArrowRight } from "lucide-react";

// utils
import { format } from "date-fns";
import { useOutsideClick } from "@/hooks/useOutsideClick ";
import type { NewDays } from "@/context/CalendarContext";

interface TAddingEventModal {
  chosenDay: NewDays | null;
  createModalStatus: boolean;
  setCreateModalStatus: (c: boolean) => void;
}

export default function AddingEventModal({
  chosenDay,
  createModalStatus,
  setCreateModalStatus
}: TAddingEventModal) {
  const handleClickOutside = () => {
    if (createModalStatus) setCreateModalStatus(!createModalStatus);
  };

  return (
    <div
      className={`absolute left-0 top-0 w-screen h-screen backdrop-blur-xs flex items-center justify-center ${
        createModalStatus ? "z-20" : "hidden"
      }`}
    >
      <div
        className="w-[450px] h-[450px] bg-white rounded-lg shadow-2xl"
        ref={useOutsideClick(handleClickOutside)}
      >
        <header className="px-5 py-3 border-b-2 flex">
          <span className="font-semibold flex-1 text-lg">Create event</span>
          <button onClick={() => setCreateModalStatus(!createModalStatus)}>
            <X color="#56616b" />
          </button>
        </header>

        <main className="p-5 border-b-1 flex flex-col gap-3">
          <CreateEventInputWrapper>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full focus:outline-none"
              onChange={() => {}}
            />
          </CreateEventInputWrapper>

          <CreateEventInputWrapper>
            <div>
              <Calendar width={20} height={20} />
            </div>
            <div>
              {chosenDay && (
                <span>
                  {chosenDay?.week_day}, {chosenDay?.month}{" "}
                  {format(chosenDay?.day, "d")}
                </span>
              )}
            </div>
          </CreateEventInputWrapper>

          <div className="flex gap-2 items-center">
            <CreateEventTimeInput text="From" onChange={() => {}} />

            <ArrowRight width={20} height={20} color="#56616b" />

            <CreateEventTimeInput text="To" onChange={() => {}} />
          </div>

          <div className="mt-3">
            <CreateEventInputWrapper>
              <div className="h-[90px] w-full">
                <textarea
                  className="resize-none w-full h-full focus:outline-none"
                  placeholder="Add a descriptions..."
                />
              </div>
            </CreateEventInputWrapper>
          </div>
        </main>

        <footer className="px-5 py-3 flex text-sm font-semibold gap-2">
          <button
            className="flex-1 py-3 border-1 shadow rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in"
            onClick={() => setCreateModalStatus(!createModalStatus)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 border-1 shadow rounded-lg bg-green-600 border-green-700 text-white hover:bg-green-700 transition-all duration-200 ease-in"
            type="submit"
          >
            Create event
          </button>
        </footer>
      </div>
    </div>
  );
}
