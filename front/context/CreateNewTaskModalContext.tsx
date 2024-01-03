"use client";

import { useContext, createContext } from "react";

import type { Events } from "@/interfaces/interfaces";
import type { NewDays } from "@/interfaces/interfaces";

export interface GlobalModalStatus {
  createModalStatus: boolean;
  chosenDay: NewDays | null;
  events: Events[];
  setCreateModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setEvents: (c: Events[]) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  chosenDay: null,
  events: [],
  setCreateModalStatus: () => {},
  setChosenDay: () => {},
  setEvents: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
