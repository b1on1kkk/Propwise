"use client";

// components
import ChatAside from "@/components/ChatAside/ChatAside";
import { useState } from "react";

export default function InboxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [] = useState<any>([]);

  return (
    <main className="h-screen border-l-1 flex overflow-hidden">
      {/* left aside menu */}
      <ChatAside />
      {/*  */}

      {/* main chat menu */}
      <main className="flex-1">{children}</main>
    </main>
  );
}
