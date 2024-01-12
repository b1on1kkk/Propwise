import React from "react";

import { Pin } from "lucide-react";

import type { TChat } from "@/interfaces/interfaces";
// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { CheckUserOnline } from "@/utils/CheckUserOnline";

interface TChatCard {
  user: TChat;
  chatStatus: "pinned" | "all";
}

export default function ChatCard({ user, chatStatus }: TChatCard) {
  const { onlineUsers } = useGlobalModalStatus();

  return (
    <div className="hover:bg-gray-100 transition-all duration-200 ease-in">
      <div className="flex p-5 items-center gap-5">
        <div className="w-11 h-11 rounded-full bg-gray-400 relative">
          {CheckUserOnline(onlineUsers, user.id) && (
            <span className="flex absolute h-2 w-2 bottom-0 right-0 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009965] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009965]" />
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex w-full items-center">
            <div className="flex-1 font-bold">
              {user.name} {user.lastname}
            </div>
            <div className="text-[#56616b] text-xs">1h ago</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <span>You:</span>
              <span className="text-[#56616b] text-sm ml-1">It's magic</span>
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
