// components
import { Pin, Check, CheckCheck } from "lucide-react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { CheckUserOnline } from "@/utils/CheckUserOnline";

// interfaces
import type { TChatCard } from "@/interfaces/interfaces";

import { isJsonString } from "@/utils/isJsonString";

export default function ChatCard({
  chat,
  chatStatus,
  onDoubleClickToPinMessage
}: TChatCard) {
  const { onlineUsers, user } = useGlobalModalStatus();

  return (
    <div
      className="hover:bg-gray-100 transition-all duration-200 ease-in rounded-lg hover:dark:bg-slate-700"
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
            <div className="text-[#56616b] text-xs">{chat.timestamp}</div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex-1 flex items-center">
              {chat.value === null ? (
                <span className="text-[#56616b] text-sm mt-0.5 w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
                  Will be the first! Start messanging!
                </span>
              ) : (
                <span className="text-[#56616b] text-sm mt-0.5 w-[150px] text-ellipsis whitespace-nowrap overflow-hidden">
                  {isJsonString(chat.value)
                    ? `${JSON.parse(chat.value).event_name} - shared evet`
                    : chat.value}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {chat.sender_id === user[0].id && (
                <>
                  {chat.status === 1 ? (
                    <div className="text-[#56616b]">
                      <CheckCheck width={12} height={12} />
                    </div>
                  ) : (
                    <div className="text-[#56616b]">
                      <Check width={12} height={12} />
                    </div>
                  )}
                </>
              )}

              {chatStatus === "pinned" && (
                <div className="rotate-45 text-[#56616b]">
                  <Pin width={12} height={12} fill="#56616b" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
