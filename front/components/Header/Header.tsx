"use client";

import { useEffect, useState } from "react";

// components
import { Search, Bell } from "lucide-react";

// constants
import { HOMEPAGE_HEADER } from "@/constants/HomepageHeader";

import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import type { User } from "@/interfaces/interfaces";
import StatusButton from "../MemberCard/StatusButton/StatusButton";
import axios from "axios";

interface FriendRequestNotification {
  context: {
    content: string;
    user: User;
  };
  notif_type: "system" | "friend_request";
}

interface FriendRequestNotificationFromDatabase {
  context: string;
  notif_type: "system" | "friend_request";
}

async function GetNotifications(user_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/notificaitons?user_id=${user_id}`
    );

    return res.data as FriendRequestNotificationFromDatabase[];
  } catch (error) {
    console.log(error);
  }

  return [];
}

export default function Header() {
  const [moveTo, setMoveTo] = useState<string>("-2px");

  const { socket, user } = useGlobalModalStatus();

  const [friendRequestNotif, setFriendRequestNotif] = useState<
    FriendRequestNotification[]
  >([]);

  // if user online - get notification that someone wants to be a friend
  if (socket) {
    socket.on("sendNotificationsFrom", (data) => {
      setFriendRequestNotif([
        ...friendRequestNotif,
        { context: JSON.parse(data.message), notif_type: data.notif_type }
      ]);
    });
  }

  // load notifications from database
  useEffect(() => {
    if (user.length > 0) {
      // get then using API function
      GetNotifications(user[0].id)
        .then((notifications) => {
          // create temp variable to convert JSON to normal obj
          const parsedNotifications: FriendRequestNotification[] = [];

          // converting...
          notifications.forEach((notif) => {
            parsedNotifications.push({
              context: JSON.parse(notif.context),
              notif_type: notif.notif_type
            });
          });

          // setting data
          setFriendRequestNotif(parsedNotifications);
        })
        .catch(() => console.log("Sorry, error occur :("));
    }
  }, [user]);

  // function AttestToBeFriends(){

  // }

  console.log(friendRequestNotif);

  return (
    <header className="p-3 py-[9px] border-b-1 flex items-center border-l-1">
      <div className="flex flex-1">
        <div className="flex py-2 bg-gray-100 rounded-lg relative select-none z-10">
          {HOMEPAGE_HEADER.map((item, idx) => {
            return (
              <button
                className={`font-semibold px-10 z-10 cursor-pointer text-[#56616b]`}
                key={idx}
                onClick={() => setMoveTo(item.move_to)}
              >
                {item.text}
              </button>
            );
          })}
          <div
            className={`w-88 h-10 bg-white top-0 absolute border-1 rounded-lg ${
              moveTo === "-2"
                ? "right-minus"
                : moveTo === "248px"
                ? "right-248px"
                : moveTo === "165px"
                ? "right-165px"
                : moveTo === "84px"
                ? "right-84px"
                : "right-minus"
            } shadow-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]`}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center bg-gray-100 border-1 px-3 rounded-lg gap-2">
          <Search width={18} height={18} className="opacity-70" />
          <form>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none bg-inherit w-60 placeholder:font-semibold"
            />
          </form>
        </div>
        <div className="flex items-center justify-center p-3 border-1 rounded-lg relative">
          <Bell width={16} height={16} fill="black"></Bell>

          <div className="w-[300px] border-1 shadow-md bg-white h-[400px] absolute right-0 top-11 rounded-lg z-30 p-4 overflow-auto">
            {friendRequestNotif.length > 0 && (
              <>
                {friendRequestNotif.map((notification, idx) => {
                  if (notification.notif_type === "friend_request") {
                    return (
                      <div
                        className="border-1 shadow p-2 rounded-lg flex items-center gap-2"
                        key={idx}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-400" />

                        <div className="flex flex-col text-[#56616b] flex-1">
                          <span className="text-sm font-semibold">
                            {notification.context.user.name}{" "}
                            {notification.context.user.lastname}
                          </span>
                          <span className="text-xs">
                            {notification.context.content}
                          </span>
                        </div>

                        <StatusButton
                          icon_name="UserRoundPlus"
                          className="py-2 px-2 border-1 rounded-lg shadow bg-[#009965] text-white active:translate-y-0.5 cursor-pointer flex items-center justify-center"
                          onClick={() => {}}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="border-1 shadow rounded-lg p-2 flex"
                        key={idx}
                      >
                        <span className="text-sm">
                          {notification.context.content}
                        </span>
                      </div>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
