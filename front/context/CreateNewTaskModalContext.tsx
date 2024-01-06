"use client";

import { useContext, createContext } from "react";

import type {
  Events,
  NewDays,
  User,
  OnlineSocketUsers
} from "@/interfaces/interfaces";

export interface GlobalModalStatus {
  createModalStatus: boolean;
  detailedModalStatus: boolean;
  chosenDay: NewDays | null;
  events: Events[];
  user: User[];
  onlineUsers: OnlineSocketUsers[];
  setCreateModalStatus: (c: boolean) => void;
  setDetailedModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setEvents: (c: Events[]) => void;
  setChosenToSeeDetailedInfDay: (c: NewDays) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  detailedModalStatus: false,
  chosenDay: null,
  events: [],
  user: [],
  onlineUsers: [],
  setCreateModalStatus: () => {},
  setDetailedModalStatus: () => {},
  setChosenDay: () => {},
  setEvents: () => {},
  setChosenToSeeDetailedInfDay: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
