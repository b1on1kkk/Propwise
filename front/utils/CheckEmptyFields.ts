export function CheckEmptyFields(string: string[]): boolean {
  for (let i = 0; i < string.length; i++) {
    if (string[i].trim() === "") {
      return false;
    }
  }
  return true;
}
