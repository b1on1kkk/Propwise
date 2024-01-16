"use client";

import { useState } from "react";

// components
import ChatAside from "@/components/ChatAside/ChatAside";

// context
import { InboxContext } from "@/context/InboxContext";

// hooks
import { useLocalStorageLastChosenChat } from "@/hooks/useLocalStorageLastChosenChat";

// interfaces
import type { TChat } from "@/interfaces/interfaces";

export default function InboxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { storedValue, setValue } = useLocalStorageLastChosenChat(
    "last_chosen_chat",
    null
  );

  // chats storage
  const [chats, setChats] = useState<TChat[]>([]);

  return (
    <main className="h-screen border-l-1 flex overflow-hidden">
      <InboxContext.Provider
        value={{
          storedValue,
          setValue,
          chats,
          setChats
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
