"use client";

import "./globals.css";
import { useState } from "react";

// components
import LeftAsideMenu from "@/components/LeftAsideMenu/LeftAsideMenu";
import Header from "@/components/Header/Header";

// context
import { MyGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [createModalStatus, setCreateModalStatus] = useState<boolean>(false);

  return (
    <html lang="en">
      <body className="flex max-h-screen">
        <LeftAsideMenu />
        <div className="flex flex-col flex-1">
          <Header />
          <MyGlobalModalStatus.Provider
            value={{ createModalStatus, setCreateModalStatus }}
          >
            {children}
          </MyGlobalModalStatus.Provider>
        </div>

        <div
          className={`absolute left-0 top-0 w-screen h-screen backdrop-blur-xs ${
            createModalStatus ? "z-20" : "hidden"
          }`}
        ></div>
      </body>
    </html>
  );
}
