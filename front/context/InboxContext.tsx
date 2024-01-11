import { createContext, useContext } from "react";

import type { TChat } from "@/interfaces/interfaces";

export interface TInboxContent {
  chosenUser: TChat | null;
  setChosenUser: (c: TChat) => void;
}

export const InboxContext = createContext<TInboxContent>({
  chosenUser: null,
  setChosenUser: () => {}
});

export const useInboxContext = () => useContext(InboxContext);
