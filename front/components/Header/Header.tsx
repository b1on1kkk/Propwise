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

// API
import { GetNotifications } from "@/API/GetNotifications";

// interfaces
import type { TNotifications } from "@/interfaces/interfaces";

export default function Header() {
  const { socket, user } = useGlobalModalStatus();

  const [notifications, setNotifications] = useState<TNotifications[]>([]);

  const [notificationsModalStatus, setNotificationsModalStatus] =
    useState<boolean>(true);

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
        const serializedNotifications = NotificationsSerializer(notifications);

        // setting serialized notifications
        setNotifications(serializedNotifications);
      });
    }
  }, [user]);

  console.log(notifications);

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
            className="flex items-center justify-center p-3 border-1 rounded-lg cursor-pointer"
            onClick={() =>
              setNotificationsModalStatus(!notificationsModalStatus)
            }
          >
            <Bell width={16} height={16} fill="black" />
          </button>

          {notificationsModalStatus && (
            <Notifications
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </div>
      </div>
    </header>
  );
}
