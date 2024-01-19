import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { SlidersHorizontalIcon } from "lucide-react";

export default function FilterButton() {
  const test = [
    {
      text: "Property",
      checked_status: false
    },
    {
      text: "Tenant",
      checked_status: false
    },
    {
      text: "Event type",
      checked_status: false
    },
    {
      text: "Time range",
      checked_status: false
    },
    {
      text: "Custom tags",
      checked_status: false
    }
  ];

  return (
    <Dropdown className="w-[230px]" placement="bottom-start">
      <DropdownTrigger>
        <Button className="bg-white border-1 shadow rounded-lg min-w-0 px-3 py-2 text-[#56616b]">
          <SlidersHorizontalIcon width={17} height={17} />
          <span className="font-semibold">Filter</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        variant="flat"
        aria-label="events-filter"
      >
        {test.map((item) => {
          return (
            <DropdownItem key={item.text} textValue={item.text}>
              <Checkbox color="primary" isSelected={item.checked_status}>
                <span className="text-[#56616b] font-semibold">
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
