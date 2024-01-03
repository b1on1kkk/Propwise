"use client";

import "./globals.css";
import { useState } from "react";

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";
import AddingEventModal from "@/components/AddingEventModal/AddingEventModal";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

import type { NewDays } from "@/interfaces/interfaces";
import type { Events } from "@/interfaces/interfaces";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);

  const [events, setEvents] = useState<Events[]>([]);

  return (
    <html lang="en">
      <body
        className={`flex max-h-screen ${
          createModalStatus && "overflow-hidden"
        }`}
      >
        <LeftAsideMenu />

        <MyGlobalModalStatus.Provider
          value={{
            chosenDay,
            createModalStatus,
            events,
            setCreateModalStatus,
            setChosenDay,
            setEvents
          }}
        >
          <div className="flex flex-col flex-1">
            <Header />
            {children}
          </div>

          <AddingEventModal />
        </MyGlobalModalStatus.Provider>
      </body>
    </html>
  );
}
