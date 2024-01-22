"use client";

import { useState } from "react";

// components
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { SlidersHorizontalIcon } from "lucide-react";

// utils
import { SelectCheckbox } from "@/utils/SelectCheckboxFilterQuery";

// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";

// constants
import {
  FILTER_CHECKBOXES,
  STATUS_BORDER_COLOR
} from "@/constants/FilterCheckboxes";

// interfaces
import type { TCheckBoxes } from "@/interfaces/interfaces";

export default function FilterButton() {
  const [checkBoxesData, setCheckBoxesData] =
    useState<TCheckBoxes[]>(FILTER_CHECKBOXES);

  const { setFilterQuery } = useGlobalCalendatContext();

  return (
    <Dropdown className="w-[230px]" placement="bottom-start">
      <DropdownTrigger>
        <Button className="bg-white border-1 shadow rounded-lg min-w-0 px-3 py-2 text-[#56616b] dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text hover:dark:text-white">
          <SlidersHorizontalIcon width={17} height={17} />
          <span className="font-semibold">Filter</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        variant="flat"
        aria-label="events-filter"
      >
        {checkBoxesData.map((item) => {
          return (
            <DropdownItem
              key={item.text}
              textValue={item.text}
              className={`border-2 border-transparent ${
                item.checked_status && STATUS_BORDER_COLOR[item.query]
              }`}
            >
              <Checkbox
                color={item.status_checkbox_color}
                isSelected={item.checked_status}
                onValueChange={() =>
                  SelectCheckbox(
                    item,
                    checkBoxesData,
                    (cb_data) => setCheckBoxesData(cb_data),
                    (query) => setFilterQuery(query)
                  )
                }
              >
                <span className="text-[#56616b] font-semibold dark:text-dark_text">
                  {item.text}
                </span>
              </Checkbox>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
