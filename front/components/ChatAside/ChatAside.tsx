"use client";

import { useEffect, useState } from "react";

// components
import Chats from "../Chats/Chats";
import { Frown } from "lucide-react";
import AsideChatsHeader from "../AsideChatsHeader/AsideChatsHeader";
import StartMessagingCard from "../Chats/StartMessagingCard/StartMessagingCard";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// API
import { GetChats } from "@/API/GetChats";
import { GetFriendsWithoutExistanceChat } from "@/API/GetFriendsWithoutExistanceChat";

// interface
import type { TChat, TFriendsWithoutChat } from "@/interfaces/interfaces";

export default function ChatAside() {
  const { socket, user } = useGlobalModalStatus();

  //  variables used for show/hide blocks
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [openHidePinnedMessages, setOpenHidePinnedMessages] =
    useState<boolean>(true);
  const [openHideAllMessages, setOpenHideAllMessages] = useState<boolean>(true);

  //  storages
  const [chats, setChats] = useState<TChat[]>([]);
  const [friendsWithoutChat, setFriendsWithoutChat] = useState<
    TFriendsWithoutChat[]
  >([]);

  if (socket) {
    socket!.on("updateFriendsWithoutChat", (data) => {
      setFriendsWithoutChat(data.friends);
      setChats(data.chats);
    });
  }

  useEffect(() => {
    if (user.length > 0) {
      GetChats(user[0].id).then((chats) => {
        setChats(chats);
      });
    }
  }, [user]);

  return (
    <aside className="w-[350px] border-r-1 flex flex-col h-full">
      <header className="text-[#56616b]">
        <AsideChatsHeader
          searchValue=""
          moreButtonOnClick={() => {}}
          newChatButtonOnClick={() => {
            // send request to server only when block is closed
            if (!showFriends) {
              GetFriendsWithoutExistanceChat(user[0].id).then((data) => {
                setFriendsWithoutChat(data);
              });
            }

            setShowFriends(!showFriends);
          }}
          searchOnChange={() => {}}
        />
      </header>

      {showFriends && (
        <div className="flex flex-col">
          {friendsWithoutChat.map((friend, idx) => {
            if (friend.isInChat === "No") {
              return (
                <StartMessagingCard
                  key={idx}
                  friend={friend}
                  createChatOnClick={() => {
                    socket!.emit("createChat", {
                      user1_id: user[0].id,
                      user2_id: friend.id,
                      to_send_socket_id: socket!.id!,
                      chat_status: "all"
                    });
                  }}
                />
              );
            }
          })}
        </div>
      )}

      <main className={`overflow-auto flex-1`}>
        {chats.length > 0 ? (
          <>
            {/* pinned chats */}
            <Chats
              icon_name="Pin"
              title_text="Pinned"
              openStatus={openHidePinnedMessages}
              setOpenStatus={setOpenHidePinnedMessages}
              chatArray={chats}
              chatStatus="pinned"
            />
            {/*  */}

            {/* all chats */}
            <Chats
              icon_name="Mail"
              title_text={"All messages"}
              openStatus={openHideAllMessages}
              setOpenStatus={setOpenHideAllMessages}
              chatArray={chats}
              chatStatus="all"
            />
            {/*  */}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center w-full text-[#56616b]">
            <div>
              <Frown width={60} height={60} />
            </div>
            <div>
              <div className="font-semibold">There are no chats yet!</div>
            </div>
          </div>
        )}
      </main>
    </aside>
  );
}