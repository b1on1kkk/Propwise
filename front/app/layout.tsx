"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import axios from "axios";
axios.defaults.withCredentials = true;

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";

// providers
import Providers from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type {
  NewDays,
  User,
  OnlineSocketUsers,
  Members
} from "@/interfaces/interfaces";

// hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// constants
import { CALENDAR_SETTINGS } from "@/constants/CalendarSettings";

// socket
import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents
} from "../socket_io_typings";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  // right modal, showing more data about events
  const [detailedModalStatus, setDetailedModalStatus] =
    useState<boolean>(false);

  // chosen day storage
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);

  // chosen day storage, then its inf used to show in right modal (detailed/more inf modal)
  const [chosenToSeeDetailedInfDay, setChosenToSeeDetailedInfDay] =
    useState<NewDays | null>(null);

  // logged in user storage
  const [user, setUser] = useState<User[]>([]);
  // online users storage
  const [onlineUsers, setOnlineUsers] = useState<OnlineSocketUsers[]>([]);

  // socket storage
  const [socket, setScocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  // members storage
  const [members, setMembers] = useState<Members[]>([]);

  useEffect(() => {
    if (user.length > 0 && !socket) {
      // create socket only when user is connected
      const socket_io: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        "http://localhost:2000"
      );

      // set socket for future import
      setScocket(socket_io);

      // send if to server that user is connected
      socket_io.emit("userConnected", {
        new_connected_user_id: user[0].id
      });

      // and get inf about online users
      socket_io.on("getOnlineUsersId", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  // save to localstorage static data that user can change while using app
  const { storedLocalStorageValue, setLocalStorageValue } = useLocalStorage(
    "settings",
    { ...CALENDAR_SETTINGS[1], status: false }
  );

  return (
    <html lang="en">
      <body
        className={`${
          detailedModalStatus ? "overflow-hidden" : ""
        } flex max-h-screen max-w-screen dark:bg-dark_bg`}
      >
        <QueryClientProvider client={queryClient}>
          <MyGlobalModalStatus.Provider
            value={{
              chosenDay,
              detailedModalStatus,
              user,
              onlineUsers,
              storedLocalStorageValue,
              socket,
              members,
              chosenToSeeDetailedInfDay,
              // setters
              setDetailedModalStatus,
              setChosenDay,
              setUser,
              setChosenToSeeDetailedInfDay,
              setLocalStorageValue,
              setMembers
            }}
          >
            <Providers>
              {path !== "/login" && path !== "/registration" && (
                <LeftAsideMenu />
              )}

              <div className="flex flex-col flex-1">
                {path !== "/login" && path !== "/registration" && <Header />}
                {children}
              </div>
            </Providers>
          </MyGlobalModalStatus.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
