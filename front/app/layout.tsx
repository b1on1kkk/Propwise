"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import axios from "axios";
axios.defaults.withCredentials = true;

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";
import AddingEventModal from "@/components/AddingEventModal/AddingEventModal";
import ShowMoreEventsRightModal from "@/components/ShowMoreEventsRightModal/ShowMoreEventsRightModal";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type {
  NewDays,
  Events,
  User,
  OnlineSocketUsers
} from "@/interfaces/interfaces";
import { GetLoggedInUserInf } from "@/API/GetLoggedInUserInf";

// hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

// socket
import { io, Socket } from "socket.io-client";

import {
  ServerToClientEvents,
  ClientToServerEvents
} from "@/socket_io_typings";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:2000"
);

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);
  const [detailedModalStatus, setDetailedModalStatus] =
    useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);
  const [chosenToSeeDetailedInfDay, setChosenToSeeDetailedInfDay] =
    useState<NewDays | null>(null);

  // event storage
  const [events, setEvents] = useState<Events[]>([]);

  const [user, setUser] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineSocketUsers[]>([]);

  // get users inf if path name changes
  useEffect(() => {
    GetLoggedInUserInf().then((data: User[]) => {
      if (data.length > 0) {
        setUser(data);

        // get inf about connected users
        socket.emit("userConnected", { new_connected_user_id: data[0].id });

        // and get inf about online users
        socket.on("getOnlineUsersId", (data) => {
          setOnlineUsers(data);
        });
      }
    });
  }, [path]);

  // save to localstorage static if about blocks status
  const { storedLocalStorageValue, setLocalStorageValue } = useLocalStorage(
    "settings",
    { ...CALENDAR_SETTINGS[1], status: false }
  );

  return (
    <html lang="en">
      <body
        className={`${
          createModalStatus || detailedModalStatus ? "overflow-hidden" : ""
        } flex max-h-screen max-w-screen`}
      >
        <MyGlobalModalStatus.Provider
          value={{
            chosenDay,
            createModalStatus,
            detailedModalStatus,
            events,
            user,
            onlineUsers,
            storedLocalStorageValue,
            // setters
            setCreateModalStatus,
            setDetailedModalStatus,
            setChosenDay,
            setEvents,
            setChosenToSeeDetailedInfDay,
            setLocalStorageValue
          }}
        >
          {path !== "/login" && path !== "/registration" && <LeftAsideMenu />}

          <div className="flex flex-col flex-1">
            {path !== "/login" && path !== "/registration" && <Header />}
            {children}
          </div>

          <AddingEventModal />
          <ShowMoreEventsRightModal day={chosenToSeeDetailedInfDay} />
        </MyGlobalModalStatus.Provider>
      </body>
    </html>
  );
}
