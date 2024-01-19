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
import { UseQueryResult } from "@tanstack/react-query";

export interface GlobalModalStatus {
  detailedModalStatus: boolean;
  chosenDay: NewDays | null;
  user: User[];
  onlineUsers: OnlineSocketUsers[];
  storedLocalStorageValue: ExtendedLocalStorageType;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  members: Members[];
  chosenToSeeDetailedInfDay: NewDays | null;
  setDetailedModalStatus: (c: boolean) => void;
  setChosenDay: (c: NewDays) => void;
  setUser: (c: User[]) => void;
  setChosenToSeeDetailedInfDay: (c: NewDays) => void;
  setLocalStorageValue: (c: ExtendedLocalStorageType) => void;
  setMembers: (c: Members[]) => void;
}

export const MyGlobalModalStatus = createContext<GlobalModalStatus>({
  detailedModalStatus: false,
  chosenDay: null,
  user: [],
  onlineUsers: [],
  storedLocalStorageValue: { ...CALENDAR_SETTINGS[1], status: false },
  socket: null,
  members: [],
  chosenToSeeDetailedInfDay: null,
  setDetailedModalStatus: () => {},
  setChosenDay: () => {},
  setUser: () => {},
  setChosenToSeeDetailedInfDay: () => {},
  setLocalStorageValue: () => {},
  setMembers: () => {}
});

export const useGlobalModalStatus = () => useContext(MyGlobalModalStatus);
