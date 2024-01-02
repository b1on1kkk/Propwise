"use client";

import "./globals.css";
import { useState } from "react";

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";
import AddingEventModal from "@/components/AddingEventModal/AddingEventModal";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

import type { NewDays } from "@/context/CalendarContext";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);
  const [chosenDay, setChosenDay] = useState<NewDays | null>(null);

  return (
    <html lang="en">
      <body
        className={`flex max-h-screen ${
          createModalStatus && "overflow-hidden"
        }`}
      >
        <LeftAsideMenu />
        <div className="flex flex-col flex-1">
          <Header />
          <MyGlobalModalStatus.Provider
            value={{ createModalStatus, setCreateModalStatus, setChosenDay }}
          >
            {children}
          </MyGlobalModalStatus.Provider>
        </div>

        <AddingEventModal
          chosenDay={chosenDay}
          createModalStatus={createModalStatus}
          setCreateModalStatus={setCreateModalStatus}
        />
      </body>
    </html>
  );
}
