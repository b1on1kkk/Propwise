"use client";

import { useEffect, useState } from "react";

// components
import Chats from "../Chats/Chats";
import AsideChatsHeader from "../AsideChatsHeader/AsideChatsHeader";
import StartMessagingCard from "../Chats/StartMessagingCard/StartMessagingCard";
import { Spinner } from "@nextui-org/react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { useInboxContext } from "@/context/InboxContext";

// API
import { GetChats } from "@/API/GetChats";
import { GetFriends } from "@/API/GetFriends";

// utils
import { PinMessages } from "@/utils/PinMessages";
import { CheckFriendsIfChatAlreadyExist } from "@/utils/CheckFriendsIfChatAlreadyExist";

// interface
import type { TFriends } from "@/interfaces/interfaces";

export default function ChatAside() {
  const { socket, user } = useGlobalModalStatus();
  const { chats, setChats } = useInboxContext();

  //  variables used for show/hide blocks
  const [showFriends, setShowFriends] = useState<boolean>(false);

  //  storages
  const [friends, setFriends] = useState<TFriends[]>([]);

  if (socket) {
    socket.on("updateFriends", (data) => {
      setChats(data.chats);
      setFriends([]);
    });

    // set up listener to update chat when one of the user delete it
    socket.on("updateChats", (data) => {
      setChats(data.chats);
    });
  }

  const { refetch, data, isLoading, isError } = GetChats(user);

  useEffect(() => {
    if (data && user.length > 0) refetch();
  }, [user]);

  useEffect(() => {
    if (data) setChats(data);
  }, [data]);

  return (
    <aside className="w-[350px] border-r-1 flex flex-col h-full dark:border-dark_border">
      <header>
        <AsideChatsHeader
          searchValue=""
          moreButtonOnClick={() => {}}
          newChatButtonOnClick={() => {
            // send request to server only when block is closed
            if (!showFriends) {
              GetFriends(user[0].id).then((data) =>
                setFriends(CheckFriendsIfChatAlreadyExist(data, chats)[0])
              );
            }

            setShowFriends(!showFriends);
          }}
          searchOnChange={() => {}}
        />
      </header>

      {showFriends && (
        <div className="flex flex-col">
          {friends.map((friend, idx) => {
            return (
              <StartMessagingCard
                key={idx}
                friend={friend}
                createChatOnClick={() => {
                  socket!.emit("createChat", {
                    user1_id: user[0].id,
                    user2_id: friend.id,
                    chat_status: "all"
                  });

                  setShowFriends(!showFriends);
                }}
              />
            );
          })}
        </div>
      )}

      <main className="overflow-auto flex-1 p-4">
        {isLoading || isError || !data ? (
          <div className="flex h-full items-center justify-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            {/* pinned chats */}
            <Chats
              icon_name="Pin"
              title_text="Pinned"
              chatArray={chats}
              chatStatus="pinned"
              // double click to pin message and redouble click to unpin message:
              // get chat data TO pin from handler, then send this data to server using sockets, update data in database,
              // parse new chats data again, push data from server to frontend again using sockets, push this data in useState
              // and update chats
              onDoubleClickToPinMessage={(_, chat) =>
                PinMessages(chat, socket, user[0].id, (chats) =>
                  setChats(chats)
                )
              }
            />
            {/*  */}

            {/* all chats */}
            <Chats
              icon_name="Mail"
              title_text="All messages"
              chatArray={chats}
              chatStatus="all"
              // same as above
              onDoubleClickToPinMessage={(_, chat) =>
                PinMessages(chat, socket, user[0].id, (chats) =>
                  setChats(chats)
                )
              }
            />
            {/*  */}
          </>
        )}
      </main>
    </aside>
  );
}
