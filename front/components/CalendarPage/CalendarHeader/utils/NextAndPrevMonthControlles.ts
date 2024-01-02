import { add, format } from "date-fns";

export function NextMonth(
  setCurrentMonth: (c: string) => void,
  firstDayCurrentMonth: Date
) {
  const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
  setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
}

export function PrevMonth(
  setCurrentMonth: (c: string) => void,
  firstDayCurrentMonth: Date
) {
  const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
  setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
}
