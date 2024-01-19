"use client";

import { useEffect, useState } from "react";

// components
import { ChevronRight, ChevronLeft } from "lucide-react";
import NewEventModal from "@/components/NewEventModal/NewEventModal";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import MonthsButton from "./MonthsButton/MonthsButton";
import FilterButton from "./FilterButton/FilterButton";
import MonthHandlerButton from "./MonthHandlerButton/MonthHandlerButton";
import ControllerButton from "./ControllerButton/ControllerButton";

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
  const { setCurrentMonth, extendedDays } = useGlobalCalendatContext();
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
        <MonthsButton />

        <FilterButton />

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
        <MonthHandlerButton
          onClick={() => PrevMonth(setCurrentMonth, firstDayCurrentMonth)}
        >
          <ChevronLeft width={15} height={15} />
        </MonthHandlerButton>

        <MonthHandlerButton
          onClick={() => NextMonth(setCurrentMonth, firstDayCurrentMonth)}
        >
          <ChevronRight width={15} height={15} />
        </MonthHandlerButton>

        {/* delimiter */}
        <div className="h-7 border-1"></div>
        {/*  */}

        <ControllerButton
          className={`flex gap-1.5 rounded-lg ${
            isAnyDayChosenStatus
              ? "bg-[#009965] text-white"
              : "bg-gray-400 text-white"
          } border-1 shadow min-w-0 px-3 py-2 h-[38px]`}
          onClick={() => {
            if (isAnyDayChosenStatus) onOpen();
          }}
          icon_side="left"
          icon_name="Plus"
          button_text="Create"
        />

        <ControllerButton
          className={`flex gap-1.5 rounded-lg bg-white border-1 shadow text-[#56616b] min-w-0 px-3 py-2 h-[38px]`}
          onClick={() => {}}
          icon_side="right"
          icon_name="ArrowDownCircle"
          button_text="Export"
        />

        {/* add new event modal */}
        <NewEventModal isOpen={isOpen} onClose={onClose} />
        {/*  */}
      </div>
    </div>
  );
}
