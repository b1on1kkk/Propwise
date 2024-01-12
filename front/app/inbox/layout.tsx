"use client";

// components
import ChatAside from "@/components/ChatAside/ChatAside";
import { useState } from "react";

// context
import { InboxContext } from "@/context/InboxContext";

// interfaces
import type { TChat } from "@/interfaces/interfaces";

export default function InboxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [chosenUser, setChosenUser] = useState<TChat | null>(null);

  return (
    <main className="h-screen border-l-1 flex overflow-hidden">
      <InboxContext.Provider
        value={{
          chosenUser,
          setChosenUser
        }}
      >
        {/* left aside menu */}
        <ChatAside />
        {/*  */}

        {/* main chat menu */}
        <main className="flex-1 flex">{children}</main>
      </InboxContext.Provider>
    </main>
  );
}
