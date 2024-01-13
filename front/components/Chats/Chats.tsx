import Link from "next/link";

// components
import ChatCard from "./ChatCard/ChatCard";
import { ChevronDown, icons } from "lucide-react";

// context
import { useInboxContext } from "@/context/InboxContext";

// interfaces
import type { TChats } from "@/interfaces/interfaces";

export default function Chats({
  icon_name,
  title_text,
  openStatus,
  chatStatus,
  chatArray,
  setOpenStatus,
  onDoubleClickToPinMessage
}: TChats) {
  const Icon = icons[icon_name as keyof typeof icons];

  const { setValue } = useInboxContext();

  console.log(chatArray);

  console.log(chatStatus);

  return (
    <div
      className={`${
        openStatus ? "" : "h-10"
      } overflow-hidden transition-all duration-200`}
    >
      {/* header pinned chats */}
      <header className="flex text-[#56616b] px-5 py-2 items-center">
        <div className="flex flex-1 gap-3 items-center">
          <div className={`${chatStatus === "pinned" ? "rotate-45" : ""}`}>
            <Icon
              width={15}
              height={15}
              color={`${chatStatus === "all" ? "white" : "#56616b"}`}
              fill="#56616b"
            />
          </div>
          <span className="text-sm">{title_text}</span>
        </div>

        <button
          className="p-1 hover:bg-gray-200 transition-all duration-200 rounded-lg flex items-center justify-center"
          onClick={() => setOpenStatus(!openStatus)}
        >
          <ChevronDown
            width={16}
            height={16}
            className={`${
              openStatus ? "rotate-180" : "rotate-0"
            } transition-all duration-150`}
          />
        </button>
      </header>
      {/*  */}

      <main>
        {chatArray.map((chat, idx) => {
          if (chat.chat_status === chatStatus) {
            return (
              <Link
                href={`/inbox/${chat.id}`}
                key={idx}
                onClick={() => setValue(chat)}
              >
                <ChatCard
                  chat={chat}
                  chatStatus={chatStatus}
                  onDoubleClickToPinMessage={onDoubleClickToPinMessage}
                />
              </Link>
            );
          }
        })}
      </main>
    </div>
  );
}
