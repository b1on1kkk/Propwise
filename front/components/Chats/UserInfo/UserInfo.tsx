"use client";

import { useRouter } from "next/navigation";

// components
import HeaderUserInf from "../HeaderUserInf/HeaderUserInf";
import { CircleUserRound, UserRoundX } from "lucide-react";
import ChatHeaderButton from "@/components/ChatHeaderButton/ChatHeaderButton";
import { Tooltip, Button } from "@nextui-org/react";

// context
import { useInboxContext } from "@/context/InboxContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type { TUserInfo } from "@/interfaces/interfaces";

export default function UserInfo({ isOnlineStatus, onClick }: TUserInfo) {
  const { storedValue } = useInboxContext();
  const { socket } = useGlobalModalStatus();

  const router = useRouter();

  function DeleteChat() {
    const configureDeleteChatData = {
      chat_id: storedValue!.chat_id,
      user1_id: storedValue!.user1_id,
      user2_id: storedValue!.user2_id
    };

    socket!.emit("deleteChat", configureDeleteChatData);

    // redirect user
    router.push("/inbox");
  }

  return (
    <div className="border-l-1 w-[350px] p-5 flex flex-col">
      <header>
        <div className="flex items-center">
          <span className="flex-1 text-xl font-semibold text-[#56616b]">
            User Info
          </span>
          <ChatHeaderButton
            icon_name="X"
            width={17}
            height={17}
            tooltip_title="Close"
            placement="top"
            onClick={onClick}
          />
        </div>

        <div className="mt-10">
          <HeaderUserInf
            name={storedValue!.name}
            lastname={storedValue!.lastname}
            online_status={isOnlineStatus ? "online" : "last seen recently"}
          >
            <div className="w-20 h-20 bg-gray-400 rounded-full" />
          </HeaderUserInf>
        </div>
      </header>

      <main className="mt-5 flex gap-8 flex-1">
        <div className="mt-2">
          <CircleUserRound width={20} height={20} />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div>{storedValue!.email}</div>
            <div className="text-sm text-[#56616b]">email</div>
          </div>
          <div>
            <div>just test text here</div>
            <div className="text-sm text-[#56616b]">Bio</div>
          </div>
          <div>
            <div className="text-indigo-500">@{storedValue!.name}</div>
            <div className="text-sm text-[#56616b]">Username</div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center">
        <Tooltip
          content={
            <div className="px-1 py-2 text-center">
              <div className="text-small font-bold">WARNING!!!</div>
              <div className="text-tiny">
                All messages will be deleted forever! Are you sure?
              </div>
            </div>
          }
          color="danger"
        >
          <Button onClick={() => DeleteChat()} color="danger">
            <UserRoundX width={19} height={19} />
            <span className="text-sm">Delete chat</span>
          </Button>
        </Tooltip>
      </footer>
    </div>
  );
}
