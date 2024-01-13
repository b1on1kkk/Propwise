import React, { useState } from "react";

import { Pin } from "lucide-react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { CheckUserOnline } from "@/utils/CheckUserOnline";

// interfaces
import type { TChat } from "@/interfaces/interfaces";

export interface TChatCard {
  chat: TChat;
  chatStatus: "pinned" | "all";
  onDoubleClickToPinMessage: (
    e: React.MouseEvent<HTMLDivElement>,
    chat: TChat
  ) => void;
}

export default function ChatCard({
  chat,
  chatStatus,
  onDoubleClickToPinMessage
}: TChatCard) {
  const { onlineUsers } = useGlobalModalStatus();

  return (
    <div
      className="hover:bg-gray-100 transition-all duration-200 ease-in"
      onDoubleClick={(e) => onDoubleClickToPinMessage(e, chat)}
    >
      <div className="flex p-5 items-center gap-5">
        <div className="w-11 h-11 rounded-full bg-gray-400 relative">
          {CheckUserOnline(onlineUsers, chat.id) && (
            <span className="flex absolute h-2 w-2 bottom-0 right-0 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009965] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009965]" />
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex w-full items-center">
            <div className="flex-1 font-bold">
              {chat.name} {chat.lastname}
            </div>
            <div className="text-[#56616b] text-xs">1h ago</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1 flex items-center">
              <span>You:</span>
              <span className="text-[#56616b] text-sm ml-1 mt-0.5 w-[150px] text-ellipsis whitespace-nowrap overflow-hidden">
                It's magicssssssssssssssssssssssssssssssss
              </span>
            </div>

            {chatStatus === "pinned" && (
              <div className="rotate-45 text-[#56616b]">
                <Pin width={12} height={12} fill="#56616b" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
