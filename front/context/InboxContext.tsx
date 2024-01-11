import { createContext, useContext } from "react";

export interface TInboxContent {}

export const InboxContext = createContext<TInboxContent>({});

export const useInboxContext = () => useContext(InboxContext);
