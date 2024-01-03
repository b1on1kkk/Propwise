"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";
import AddingEventModal from "@/components/AddingEventModal/AddingEventModal";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { getUsersLoggedStatus } from "@/utils/getUsersLoggedStatus";
import { GetLoggedInUserInf } from "@/utils/GetLoggedInUserInf";

// interfaces
import type {
  NewDays,
  SessionEstablishedAnswer,
  Events,
  User
} from "@/interfaces/interfaces";

// for sessions
axios.defaults.withCredentials = true;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);
  const [userStatus, setUserStatus] = useState<SessionEstablishedAnswer | null>(
    null
  );
  const [loggedUser, setLoggedUser] = useState<User[] | null>(null);

  // temporary event storage
  const [events, setEvents] = useState<Events[]>([]);

  // getting logged in user status
  useEffect(() => {
    getUsersLoggedStatus().then((data) => setUserStatus(data));
  }, []);

  // getting users inf when and only when status have changed
  useEffect(() => {
    if (userStatus?.status === 200)
      GetLoggedInUserInf().then((user) => setLoggedUser(user));
  }, [userStatus]);

  return (
    <html lang="en">
      <body className={createModalStatus ? "overflow-hidden" : ""}>
        <div className="flex max-h-screen">
          <MyGlobalModalStatus.Provider
            value={{
              chosenDay,
              createModalStatus,
              events,
              loggedUser,
              // setters
              setCreateModalStatus,
              setChosenDay,
              setEvents,
              setUserStatus
            }}
          >
            <LeftAsideMenu />

            <div className="flex flex-col flex-1">
              {userStatus?.status === 200 && <Header />}
              {children}
            </div>

            <AddingEventModal />
          </MyGlobalModalStatus.Provider>
        </div>
      </body>
    </html>
  );
}
