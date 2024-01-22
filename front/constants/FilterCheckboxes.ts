import type { TCheckBoxes } from "@/interfaces/interfaces";

export const FILTER_CHECKBOXES: TCheckBoxes[] = [
  {
    id: 0,
    text: "Do Now",
    checked_status: false,
    status_border_color: "border-danger-300",
    status_checkbox_color: "danger",
    query: "imp" // important
  },
  {
    id: 1,
    text: "Schedule",
    checked_status: false,
    status_border_color: "border-secondary-500",
    status_checkbox_color: "secondary",
    query: "impbnurg" // important but not urgently
  },
  {
    id: 2,
    text: "Delegate",
    checked_status: false,
    status_border_color: "border-success-500",
    status_checkbox_color: "success",
    query: "nimpburg" // not important but urgently
  },
  {
    id: 3,
    text: "Not Important",
    checked_status: false,
    status_border_color: "border-default-200",
    status_checkbox_color: "default",
    query: "nimp" // not important
  }
];
