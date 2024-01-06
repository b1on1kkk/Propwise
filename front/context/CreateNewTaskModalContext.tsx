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
  chosenDay: NewDays | null;
  events: Events[];
  user: User[];
  onlineUsers: OnlineSocketUsers[];
  setCreateModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setEvents: (c: Events[]) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  chosenDay: null,
  events: [],
  user: [],
  onlineUsers: [],
  setCreateModalStatus: () => {},
  setChosenDay: () => {},
  setEvents: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
