export function getRightPosition(value: string) {
  switch (value) {
    case "-2px":
      return "right-minus";
    case "248px":
      return "right-248px";
    case "165px":
      return "right-165px";
    case "84px":
      return "right-84px";
    default:
      return "";
  }
}
