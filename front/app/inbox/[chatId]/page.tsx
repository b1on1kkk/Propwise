"use client";

import React from "react";
import { useEffect, useState } from "react";

// components
import LoggedInUserMessageCard from "@/components/Chats/LoggedInUserMessageCard/LoggedInUserMessageCard";
import FriendMessageCard from "@/components/Chats/FriendMessageCard/FriendMessageCard";
import MessageInput from "@/components/Chats/MessageInput/MessageInput";
import UserInfo from "@/components/Chats/UserInfo/UserInfo";
import ChatHeader from "@/components/Chats/ChatHeader/ChatHeader";
import EmptyChatWarning from "@/components/Chats/EmptyChatWarning/EmptyChatWarning";
import LogMessagesSkeleton from "@/components/Chats/LogMessagesSkeleton/LogMessagesSkeleton";
import FriendMessageSkeleton from "@/components/Chats/FriendMessageSkeleton/FriendMessageSkeleton";

// context
import { useInboxContext } from "@/context/InboxContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// hooks
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

// utils
import { CheckUserOnline } from "@/utils/CheckUserOnline";
import { DetectUserReadMessage } from "@/utils/DetectUserReadMessage";
import { SendPrivateMessage } from "@/utils/SendPrivateMessage";

// API
import { GetMessages } from "@/API/GetMessages";

// interfaces
import type { Messages } from "@/interfaces/interfaces";

export default function Chat() {
  // fake array for skeleton messages loader
  const fakeArray = new Array(3).fill(0);

  // some data from contexts
  const { storedValue } = useInboxContext();
  const { onlineUsers, socket, user } = useGlobalModalStatus();

  // variable to open right panel
  const [moreAboutUser, setMoreAboutUser] = useState<boolean>(false);

  // text input handler
  const [messageInput, setMessageInput] = useState<string>("");

  // messages store
  const [messages, setMessages] = useState<Messages[]>([]);

  const { isLoading, isError } = GetMessages(
    storedValue!.chat_id,
    (messages) => {
      setMessages(messages);
    }
  );

  // custom hook that scroll message list to the button each time messages changes
  const ref = useScrollToBottom(messages);

  // variable to save data if user is online
  const [isUserOnlineStatus, setIsUserOnlineStatus] = useState<boolean>(false);

  // Submit new message
  function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageInput) {
      SendPrivateMessage(socket, messageInput, user, storedValue);

      setMessageInput("");
    }
  }

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
          moreAboutUserOnClick={() => setMoreAboutUser(!moreAboutUser)}
        />

        <main
          ref={ref}
          className="flex flex-col bg-gray-50 overflow-auto flex-1 py-3 px-6 gap-3 dark:bg-slate-800"
        >
          {(isLoading || isError) && (
            <>
              {fakeArray.map((_, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <LogMessagesSkeleton />
                    <FriendMessageSkeleton />
                  </React.Fragment>
                );
              })}
            </>
          )}

          {messages.length === 0 && !isLoading && !isError && (
            <div className="h-full flex items-center justify-center">
              <EmptyChatWarning
                sendFirstMessageGreeting={() =>
                  SendPrivateMessage(socket, "HEY!", user, storedValue)
                }
              />
            </div>
          )}

          {user.length > 0 && (
            <>
              {messages.length > 0 && !isLoading && !isError && (
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
