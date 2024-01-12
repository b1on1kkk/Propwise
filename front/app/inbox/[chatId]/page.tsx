"use client";

import { useEffect, useState } from "react";

// components
import LoggedInUserMessageCard from "@/components/Chats/LoggedInUserMessageCard/LoggedInUserMessageCard";
import FriendMessageCard from "@/components/Chats/FriendMessageCard/FriendMessageCard";
import MessageInput from "@/components/Chats/MessageInput/MessageInput";
import UserInfo from "@/components/Chats/UserInfo/UserInfo";
import ChatHeader from "@/components/Chats/ChatHeader/ChatHeader";

// context
import { useInboxContext } from "@/context/InboxContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { format } from "date-fns";
import { CheckUserOnline } from "@/utils/CheckUserOnline";
import { GetMessages } from "@/API/GetMessages";

// interfaces
import type { Messages } from "@/interfaces/interfaces";

export default function Chat() {
  const { chosenUser } = useInboxContext();
  const { onlineUsers, socket, user } = useGlobalModalStatus();

  const [moreAboutUser, setMoreAboutUser] = useState<boolean>(false);

  const [messageInput, setMessageInput] = useState<string>("");

  const [messages, setMessages] = useState<Messages[]>([]);

  function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageInput) {
      const configureMessage = {
        name: user[0].name,
        lastname: user[0].lastname,
        chat_id: chosenUser!.chat_id,
        sender_id: user[0].id,
        sender_socket: socket!.id!,
        to_send_id: chosenUser!.id,
        value: messageInput,
        timestamp: format(new Date(), "HH:mm")
      };

      socket!.emit("sendPrivateMessage", configureMessage);

      setMessageInput("");
    }
  }

  useEffect(() => {
    GetMessages(chosenUser!.chat_id).then((messages) => {
      setMessages(messages);
    });
  }, []);

  const [isUserOnlineStatus, setIsUserOnlineStatus] = useState<boolean>(false);

  // set up users online status here only when component build in or dependency changes
  useEffect(() => {
    if (chosenUser && onlineUsers)
      setIsUserOnlineStatus(CheckUserOnline(onlineUsers, chosenUser.id));
  }, [onlineUsers]);

  if (socket) {
    socket!.on("getPrivateMessage", (data) => {
      setMessages([
        ...messages,
        {
          name: data.name,
          lastname: data.lastname,
          sender_id: data.sender_id,
          value: data.value,
          timestamp: data.timestamp
        }
      ]);
    });
  }

  // think about refresh and how to refresh user inf without error (two ways to fix it:
  // using localstorage
  // get data by page id)
  return (
    <>
      <div className="flex flex-col flex-1">
        <ChatHeader
          isOnlineStatus={isUserOnlineStatus}
          moreAboutUserStatus={moreAboutUser}
          searchOnClick={() => {}}
          moreOnClick={() => {}}
          moreAboutUserOnClick={() => setMoreAboutUser(!moreAboutUser)}
        />

        <main className="flex flex-col bg-gray-50 overflow-auto flex-1 py-3 px-6 gap-3">
          {messages.map((message, idx) => {
            if (message.sender_id === user[0].id) {
              return (
                <LoggedInUserMessageCard
                  key={idx}
                  name={message.name}
                  lastname={message.lastname}
                  timestamp={message.timestamp}
                  value={message.value}
                />
              );
            }

            return (
              <FriendMessageCard
                key={idx}
                name={message.name}
                lastname={message.lastname}
                timestamp={message.timestamp}
                value={message.value}
              />
            );
          })}
        </main>

        {/* message input */}
        <MessageInput
          value={messageInput}
          SubmitHandler={SubmitHandler}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        {/*  */}
      </div>

      {/* more about user */}
      {moreAboutUser && (
        <UserInfo
          onClick={() => setMoreAboutUser(!moreAboutUser)}
          isOnlineStatus={isUserOnlineStatus}
        />
      )}
    </>
  );
}
