"use client";

// components
import ChatAside from "@/components/ChatAside/ChatAside";

// context
import { InboxContext } from "@/context/InboxContext";

// hooks
import { useLocalStorageLastChosenChat } from "@/hooks/useLocalStorageLastChosenChat";

export default function InboxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { storedValue, setValue } = useLocalStorageLastChosenChat(
    "last_chosen_chat",
    null
  );

  return (
    <main className="h-screen border-l-1 flex overflow-hidden">
      <InboxContext.Provider
        value={{
          storedValue,
          setValue
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
