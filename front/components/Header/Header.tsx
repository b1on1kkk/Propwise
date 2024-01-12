"use client";

import { useEffect, useState } from "react";

// components
import { Search, Bell } from "lucide-react";
import Notifications from "./Notifications/Notifications";
import HeaderController from "./HeaderController/HeaderController";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { NotificationsSerializer } from "@/utils/NotificationsSerializer";
import { CheckingIfNotReadNotifExist } from "@/utils/CheckingIfNotReadNotifExist";

// API
import { GetNotifications } from "@/API/GetNotifications";
import { GetFriends } from "@/API/GetFriends";

// interfaces
import type { TNotifications, TFriends } from "@/interfaces/interfaces";

export default function Header() {
  const { socket, user, members } = useGlobalModalStatus();

  const [notifications, setNotifications] = useState<TNotifications[]>([]);
  const [friends, setFriends] = useState<TFriends[]>([]);

  const [notificationsModalStatus, setNotificationsModalStatus] =
    useState<boolean>(false);

  const NotReadedStatus = CheckingIfNotReadNotifExist(notifications);

  // if user online - get notification that someone wants to be a friend
  if (socket) {
    socket.on("sendNotificationsFrom", (data) => {
      setNotifications([
        ...notifications,
        {
          notif_id: data.notif_id,
          context: JSON.parse(data.message),
          notif_type: data.notif_type,
          status: data.status,
          timestamp: data.timestamp
        }
      ]);
    });
  }

  // load notifications from database
  useEffect(() => {
    if (user.length > 0) {
      // get notifications using API function
      GetNotifications(user[0].id).then((notifications) => {
        // setting serialized notifications
        setNotifications(NotificationsSerializer(notifications));
      });
    }
  }, [user]);

  // get friends in header just for checking if friends exist and hide button in notification
  useEffect(() => {
    if (user.length > 0) {
      GetFriends(user[0].id).then((friends) => {
        setFriends(friends);
      });
    }
  }, [notifications, user, members]);

  return (
    <header className="p-3 py-[9px] border-b-1 flex items-center border-l-1">
      <div className="flex flex-1">
        <HeaderController />
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
        <div className="relative">
          <button
            className="flex items-center justify-center p-3 border-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in"
            onClick={() => {
              setNotificationsModalStatus(!notificationsModalStatus);

              if (NotReadedStatus) {
                socket!.emit("updateNotificationStatus", {
                  user_id: user[0].id,
                  socket_id: socket!.id!
                });

                socket!.on("updatedNotifications", (data) => {
                  setNotifications(NotificationsSerializer(data.notifications));
                });
              }
            }}
          >
            <Bell width={16} height={16} fill="black" />
          </button>

          {NotReadedStatus && (
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009965] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#009965]"></span>
            </span>
          )}

          {notificationsModalStatus && (
            <Notifications
              notificationsModalStatus={notificationsModalStatus}
              setNotificationsModalStatus={setNotificationsModalStatus}
              notifications={notifications}
              setNotifications={setNotifications}
              friends={friends}
            />
          )}
        </div>
      </div>
    </header>
  );
}
