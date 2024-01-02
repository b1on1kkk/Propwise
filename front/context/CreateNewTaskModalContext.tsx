"use client";

import { useContext, createContext } from "react";

import type { NewDays } from "./CalendarContext";

export interface GlobalModalStatus {
  createModalStatus: boolean;
  setCreateModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  setCreateModalStatus: () => {},
  setChosenDay: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
