"use client";

import { useEffect, useState } from "react";

// components
import CalendarHeaderButton from "@/components/CalendarHeaderButton/CalendarHeaderButton";
import {
  Calendar,
  SlidersHorizontalIcon,
  ChevronRight,
  ChevronLeft,
  Plus,
  ArrowDownCircle
} from "lucide-react";
import NewEventModal from "@/components/NewEventModal/NewEventModal";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { useGlobalCalendatContext } from "@/context/CalendarContext";

// utils
import { NextMonth, PrevMonth } from "./utils/NextAndPrevMonthControlles";
import { IsAnyDayChosen } from "./utils/IsAnyDayChosen";

export default function CalendarHeader({
  firstDayCurrentMonth
}: {
  firstDayCurrentMonth: Date;
}) {
  const { setCurrentMonth, currentMonth, extendedDays } =
    useGlobalCalendatContext();
  const { storedLocalStorageValue, setLocalStorageValue } =
    useGlobalModalStatus();

  const [isAnyDayChosenStatus, setIsAnyDayChosenStatus] = useState<boolean>(
    IsAnyDayChosen(extendedDays)
  );

  useEffect(() => {
    setIsAnyDayChosenStatus(IsAnyDayChosen(extendedDays));
  }, [extendedDays]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex border-l-1 border-b-1 px-5 py-4">
      <div className="flex gap-1 items-center flex-1">
        <CalendarHeaderButton
          left_icon={<Calendar width={17} height={17} />}
          title={currentMonth}
          onClick={() => {}}
          bg_color="bg-white"
          text_color="text-[#56616b]"
        />

        <CalendarHeaderButton
          left_icon={<SlidersHorizontalIcon width={17} height={17} />}
          title="Filter"
          onClick={() => {}}
          bg_color="bg-white"
          text_color="text-[#56616b]"
        />

        {/* delimiter */}
        <div className="h-7 border-1"></div>
        {/*  */}

        <Tabs
          defaultSelectedKey={"1"}
          onSelectionChange={(key) => {
            setLocalStorageValue({
              ...CALENDAR_SETTINGS[key as number],
              status: storedLocalStorageValue.status
            });
          }}
          items={CALENDAR_SETTINGS}
        >
          {(item) => {
            return (
              <Tab
                key={`${item.id}`}
                className="text-base font-semibold"
                title={item.text}
              />
            );
          }}
        </Tabs>
      </div>

      <div className="flex items-center gap-1">
        <div>
          <button
            className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
            onClick={() => PrevMonth(setCurrentMonth, firstDayCurrentMonth)}
          >
            <ChevronLeft width={15} height={15} />
          </button>
        </div>

        <div>
          <button
            className="p-2 border-1 rounded-lg text-[#56616b] shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer"
            onClick={() => NextMonth(setCurrentMonth, firstDayCurrentMonth)}
          >
            <ChevronRight width={15} height={15} />
          </button>
        </div>

        {/* delimiter */}
        <div className="h-7 border-1"></div>
        {/*  */}

        <CalendarHeaderButton
          left_icon={<Plus width={17} height={17} />}
          title="Create"
          onClick={() => {
            if (isAnyDayChosenStatus) onOpen();
          }}
          bg_color={`${isAnyDayChosenStatus ? "bg-[#009965]" : "bg-gray-400"}`}
          text_color="text-white"
        />

        {/* add new event modal */}
        <NewEventModal isOpen={isOpen} onClose={onClose} />
        {/*  */}

        <CalendarHeaderButton
          right_icon={<ArrowDownCircle width={17} height={17} />}
          title="Export"
          onClick={() => {}}
          bg_color="bg-white"
          text_color="text-[#56616b]"
        />
      </div>
    </div>
  );
}
