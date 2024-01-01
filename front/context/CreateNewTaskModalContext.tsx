"use client";

import { useContext, createContext } from "react";

export interface GlobalModalStatus {
  createModalStatus: boolean;
  setCreateModalStatus: (c: boolean) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  setCreateModalStatus: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
