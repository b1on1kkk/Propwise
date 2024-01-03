import type { TNewEventInitialState } from "@/interfaces/interfaces";

export function CheckForEmptyFields(data: TNewEventInitialState): boolean {
  const dataArray: string[] = Object.values(data);

  for (let i = 0; i < dataArray.length; i++)
    if (!dataArray[i].replace(/\s/g, "")) return false;

  return true;
}
