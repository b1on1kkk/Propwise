import { createContext, useContext } from "react";

import type { TChat } from "@/interfaces/interfaces";

export interface TInboxContent {
  storedValue: TChat | null;
  chats: TChat[];
  setChats: (c: TChat[]) => void;
  setValue: (c: TChat) => void;
}

export const InboxContext = createContext<TInboxContent>({
  storedValue: null,
  chats: [],
  setChats: () => {},
  setValue: () => {}
});

export const useInboxContext = () => useContext(InboxContext);
