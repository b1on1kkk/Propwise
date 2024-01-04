"use client";

import "./globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";
import AddingEventModal from "@/components/AddingEventModal/AddingEventModal";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type { NewDays, Events } from "@/interfaces/interfaces";

// for sessions
axios.defaults.withCredentials = true;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);

  // temporary event storage
  const [events, setEvents] = useState<Events[]>([]);

  return (
    <html lang="en">
      <body className={createModalStatus ? "overflow-hidden" : ""}>
        <div className="flex max-h-screen">
          <MyGlobalModalStatus.Provider
            value={{
              chosenDay,
              createModalStatus,
              events,
              // setters
              setCreateModalStatus,
              setChosenDay,
              setEvents
            }}
          >
            {path !== "/login" && path !== "/registration" && <LeftAsideMenu />}

            <div className="flex flex-col flex-1">
              {path !== "/login" && path !== "/registration" && <Header />}
              {children}
            </div>

            <AddingEventModal />
          </MyGlobalModalStatus.Provider>
        </div>
      </body>
    </html>
  );
}
