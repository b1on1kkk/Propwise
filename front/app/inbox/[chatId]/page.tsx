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

// hooks
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

// utils
import { format } from "date-fns";
import { CheckUserOnline } from "@/utils/CheckUserOnline";
import { DetectUserReadMessage } from "@/utils/DetectUserReadMessage";

// API
import { GetMessages } from "@/API/GetMessages";

// interfaces
import type { Messages } from "@/interfaces/interfaces";

export default function Chat() {
  // some data from contexts
  const { storedValue } = useInboxContext();
  const { onlineUsers, socket, user } = useGlobalModalStatus();

  // variable to open right panel
  const [moreAboutUser, setMoreAboutUser] = useState<boolean>(false);

  // text input handler
  const [messageInput, setMessageInput] = useState<string>("");

  // messages store
  const [messages, setMessages] = useState<Messages[]>([]);

  // custom hook that scroll message list to the button each time messages changes
  const ref = useScrollToBottom(messages);

  // variable to save data if user is online
  const [isUserOnlineStatus, setIsUserOnlineStatus] = useState<boolean>(false);

  function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageInput) {
      const configureMessage = {
        message_id: 0,
        name: user[0].name,
        lastname: user[0].lastname,
        chat_id: storedValue!.chat_id,
        sender_id: user[0].id,
        sender_socket: socket!.id!,
        to_send_id: storedValue!.id,
        value: messageInput,
        timestamp: format(new Date(), "HH:mm"),
        status: 0
      };

      socket!.emit("sendPrivateMessage", configureMessage);

      socket!.emit("updateChatsAfterSendingMessages", {
        chat_id: storedValue!.chat_id,
        value: messageInput,
        timestamp: format(new Date(), "HH:mm"),
        user1_id: user[0].id,
        user2_id: storedValue!.id,
        status: 0
      });

      setMessageInput("");
    }
  }

  useEffect(() => {
    GetMessages(storedValue!.chat_id).then((messages) => setMessages(messages));
  }, []);

  // set up users online status here only when component build in or dependency changes
  useEffect(() => {
    if (storedValue && onlineUsers)
      setIsUserOnlineStatus(CheckUserOnline(onlineUsers, storedValue.id));
  }, [onlineUsers]);

  // new messages listener
  if (socket) {
    socket!.on("getPrivateMessage", (data) => {
      setMessages([
        ...messages,
        {
          message_id: data.message_id,
          name: data.name,
          lastname: data.lastname,
          sender_id: data.sender_id,
          value: data.value,
          timestamp: data.timestamp,
          status: data.status
        }
      ]);
    });
  }

  // this was done to track if user read message.
  useEffect(() => {
    // such long condition...
    if (messages.length > 0 && user.length > 0 && storedValue && socket) {
      DetectUserReadMessage(
        user[0].id,
        messages,
        storedValue,
        socket,
        storedValue.chat_id,
        (newMessages) => {
          setMessages(newMessages);
        }
      );
    }
    // and recall this hook when messages changes
  }, [messages]);

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

        <main
          ref={ref}
          className="flex flex-col bg-gray-50 overflow-auto flex-1 py-3 px-6 gap-3"
        >
          {user.length > 0 && (
            <>
              {messages.map((message, idx) => {
                if (message.sender_id === user[0].id) {
                  return (
                    <LoggedInUserMessageCard key={idx} message={message} />
                  );
                }

                return <FriendMessageCard key={idx} message={message} />;
              })}
            </>
          )}
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
