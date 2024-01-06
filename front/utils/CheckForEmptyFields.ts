import type { TNewEventInitialState } from "@/interfaces/interfaces";

export function CheckForEmptyFields(data: TNewEventInitialState): boolean {
  for (const [key, value] of Object.entries(data)) {
    if (!value.replace(/\s/g, "") && key !== "link") return false;
  }

  return true;
}
