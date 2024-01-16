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
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function InboxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { storedValue, setValue } = useLocalStorageLastChosenChat(
    "last_chosen_chat",
    null
  );

  const { socket } = useGlobalModalStatus();

  // chats storage
  const [chats, setChats] = useState<TChat[]>([]);

  // set listener that listen if user send message => change message on chat card for one user and for another if another is online
  if (socket) {
    socket!.on("getUpdatedDataAfterSendingMessage", (message) => {
      setChats([
        ...chats.map((chat) => {
          if (chat.chat_id === message.chat_id) {
            return {
              ...chat,
              value: message.value,
              timestamp: message.timestamp,
              sender_id: message.sender_id,
              status: message.status
            };
          }

          return chat;
        })
      ]);
    });

    socket!.on("getUpdateReadMessageInChatSide", (data) => {
      setChats([
        ...chats.map((chat) => {
          if (chat.chat_id === data.chat_id) {
            return {
              ...chat,
              status: data.status
            };
          }
          return chat;
        })
      ]);
    });
  }

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
