"use client";

import { useContext, createContext } from "react";

// interfaces
import type {
  Events,
  NewDays,
  User,
  OnlineSocketUsers,
  ExtendedLocalStorageType,
  Members
} from "@/interfaces/interfaces";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

export interface GlobalModalStatus {
  detailedModalStatus: boolean;
  chosenDay: NewDays | null;
  events: Events[];
  user: User[];
  onlineUsers: OnlineSocketUsers[];
  storedLocalStorageValue: ExtendedLocalStorageType;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  members: Members[];
  setDetailedModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setEvents: (c: Events[]) => void;
  setChosenToSeeDetailedInfDay: (c: NewDays) => void;
  setLocalStorageValue: (c: ExtendedLocalStorageType) => void;
  setMembers: (c: Members[]) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  detailedModalStatus: false,
  chosenDay: null,
  events: [],
  user: [],
  onlineUsers: [],
  storedLocalStorageValue: { ...CALENDAR_SETTINGS[1], status: false },
  socket: null,
  members: [],
  setDetailedModalStatus: () => {},
  setChosenDay: () => {},
  setEvents: () => {},
  setChosenToSeeDetailedInfDay: () => {},
  setLocalStorageValue: () => {},
  setMembers: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
