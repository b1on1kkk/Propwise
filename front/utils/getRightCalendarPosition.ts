export function getRightCalendarPosition(value: string) {
  switch (value) {
    case "0px":
      return "right-0";
    case "41px":
      return "right-41px";
    case "80px":
      return "right-80px";
    default:
      return "";
  }
}
