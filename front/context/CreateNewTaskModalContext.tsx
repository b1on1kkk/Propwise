"use client";

import { useContext, createContext } from "react";

import type {
  Events,
  NewDays,
  SessionEstablishedAnswer,
  User
} from "@/interfaces/interfaces";

export interface GlobalModalStatus {
  createModalStatus: boolean;
  chosenDay: NewDays | null;
  events: Events[];
  loggedUser: User[] | null;
  setCreateModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setEvents: (c: Events[]) => void;
  setUserStatus: (c: SessionEstablishedAnswer) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  createModalStatus: false,
  chosenDay: null,
  events: [],
  loggedUser: null,
  setCreateModalStatus: () => {},
  setChosenDay: () => {},
  setEvents: () => {},
  setUserStatus: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
