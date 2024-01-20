"use client";

import { useEffect, useState } from "react";

// components
import Notifications from "./Notifications/Notifications";
import HeaderController from "./HeaderController/HeaderController";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { NotificationsSerializer } from "@/utils/NotificationsSerializer";
import { CheckingIfNotReadNotifExist } from "@/utils/CheckingIfNotReadNotifExist";
import { CheckNotifications } from "@/utils/CheckNotifications";

// API
import { GetNotifications } from "@/API/GetNotifications";
import { GetFriends } from "@/API/GetFriends";

// interfaces
import type { TNotifications, TFriends } from "@/interfaces/interfaces";

export default function Header() {
  const { socket, user, members } = useGlobalModalStatus();

  const [notifications, setNotifications] = useState<TNotifications[]>([]);
  const [friends, setFriends] = useState<TFriends[]>([]);

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
    <header className="p-3 py-[9px] border-b-1 flex items-center border-l-1 dark:border-dark_border">
      <div className="flex flex-1">
        <HeaderController />
      </div>

      <ThemeSwitcher />

      <div className="flex gap-2">
        <HeaderSearch value="" onChange={() => {}} />

        <div>
          <Notifications
            friends={friends}
            notifications={notifications}
            NotReadedStatus={NotReadedStatus}
            setNotifications={setNotifications}
            onClick={() =>
              CheckNotifications(
                NotReadedStatus,
                socket,
                user[0].id,
                (notifications) => {
                  setNotifications(NotificationsSerializer(notifications));
                }
              )
            }
          />
        </div>
      </div>
    </header>
  );
}
