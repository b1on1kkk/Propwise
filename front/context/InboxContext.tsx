import { createContext, useContext } from "react";

import type { TChat } from "@/interfaces/interfaces";

export interface TInboxContent {
  storedValue: TChat | null;
  setValue: (c: TChat) => void;
}

export const InboxContext = createContext<TInboxContent>({
  storedValue: null,
  setValue: () => {}
});

export const useInboxContext = () => useContext(InboxContext);
