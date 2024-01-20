// components
import { Calendar } from "lucide-react";

// utils
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { addMonths, format, startOfToday } from "date-fns";

// context
import { useGlobalCalendatContext } from "@/context/CalendarContext";

export default function MonthsButton() {
  const { currentMonth, setCurrentMonth, extendedDays } =
    useGlobalCalendatContext();

  const months = Array.from({ length: 12 }, (_, i) =>
    format(
      addMonths(new Date(0), i),
      "MMMM" + "-" + format(startOfToday(), "yyyy")
    )
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button className="bg-white border-1 shadow rounded-lg min-w-0 px-3 py-2 text-[#56616b] dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text hover:dark:text-white">
          <Calendar width={17} height={17} />
          <span className="font-semibold">{currentMonth}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="months">
        {months.map((month) => {
          return (
            <DropdownItem
              key={month}
              onClick={() => setCurrentMonth(month)}
              textValue={month}
            >
              <span className="text-[#56616b] font-semibold text-base dark:text-dark_text">
                {month}
              </span>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
