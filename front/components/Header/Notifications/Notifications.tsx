"use client";

// components
import FriendRequestNotificationCard from "../FriendRequestNotificationCard/FriendRequestNotificationCard";
import SystemNotificationCard from "../SystemNotificationCard/SystemNotificationCard";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { Bell } from "lucide-react";

// hooks
import { useTheme } from "next-themes";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// API
import { DeleteNotificationFromDatabase } from "@/API/DeleteNotificationFromDatabase";

// utils
import { FriendshipSetUpMiddleware } from "@/utils/FriendshipSetUpMiddleware";

// interfaces
import type { TNotificationsModal } from "@/interfaces/interfaces";

export default function Notifications({
  friends,
  notifications,
  NotReadedStatus,
  setNotifications,
  onClick
}: TNotificationsModal) {
  const { user, socket, setMembers } = useGlobalModalStatus();
  const { theme } = useTheme();

  return (
    <Dropdown className="gap-3">
      <DropdownTrigger onClick={onClick}>
        <Button className="min-w-0 h-[42px] px-3 dark:bg-dark_bg bg-white border-1 dark:border-dark_border hover:dark:bg-dark_text">
          <Bell
            width={16}
            height={16}
            fill={theme === "dark" ? "white" : "#56616b"}
            color={theme === "dark" ? "white" : "#56616b"}
          />
          {NotReadedStatus && (
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009965] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#009965]"></span>
            </span>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="notifications"
        closeOnSelect={false}
        className="w-[300px] h-[400px] overflow-auto"
      >
        {notifications.map((notification, idx) => {
          if (notification.notif_type === "friend_request") {
            return (
              <DropdownItem
                textValue={notification.context.content}
                key={idx}
                onDoubleClick={() =>
                  DeleteNotificationFromDatabase(
                    notification.notif_id,
                    notifications
                  ).then((newNotifications) =>
                    setNotifications(newNotifications)
                  )
                }
              >
                <FriendRequestNotificationCard
                  friends={friends}
                  notification={notification}
                  CreateFriendship={() => {
                    FriendshipSetUpMiddleware(
                      socket,
                      user[0].id,
                      notification,
                      "accepted",
                      "system",
                      `${user[0].name} accepted your friend request!`,
                      setMembers
                    );
                  }}
                  DeclinedFriendship={() => {
                    FriendshipSetUpMiddleware(
                      socket,
                      user[0].id,
                      notification,
                      "declined",
                      "system",
                      `${user[0].name} declined your friend request :(`,
                      setMembers
                    );
                  }}
                  DeleteNotification={() =>
                    // call function and pass props in it
                    DeleteNotificationFromDatabase(
                      notification.notif_id,
                      notifications
                    ).then((newNotifications) =>
                      // set changed data
                      setNotifications(newNotifications)
                    )
                  }
                />
              </DropdownItem>
            );
          } else {
            return (
              <DropdownItem
                textValue={notification.context.content}
                key={idx}
                onDoubleClick={() =>
                  DeleteNotificationFromDatabase(
                    notification.notif_id,
                    notifications
                  ).then((newNotifications) =>
                    setNotifications(newNotifications)
                  )
                }
              >
                <SystemNotificationCard
                  notificaton={notification}
                  DeleteNotification={() =>
                    DeleteNotificationFromDatabase(
                      notification.notif_id,
                      notifications
                    ).then((newNotifications) =>
                      setNotifications(newNotifications)
                    )
                  }
                />
              </DropdownItem>
            );
          }
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
