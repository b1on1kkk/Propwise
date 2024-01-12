"use client";

// components
import FriendRequestNotificationCard from "../FriendRequestNotificationCard/FriendRequestNotificationCard";
import SystemNotificationCard from "../SystemNotificationCard/SystemNotificationCard";
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";

// hooks
import { useOutsideClick } from "@/hooks/useOutsideClick ";

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
  setNotifications,
  notificationsModalStatus,
  setNotificationsModalStatus
}: TNotificationsModal) {
  const { user, socket, setMembers } = useGlobalModalStatus();

  // if user click outside block - close modal window
  const handleClickOutside = () => {
    if (notificationsModalStatus)
      setNotificationsModalStatus(!notificationsModalStatus);
  };

  return (
    <div
      className="w-[300px] border-1 shadow-md bg-white h-[400px] absolute right-0 top-11 rounded-lg z-30 p-4 overflow-auto"
      ref={useOutsideClick(handleClickOutside)}
    >
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification, idx) => {
            if (notification.notif_type === "friend_request") {
              return (
                <FriendRequestNotificationCard
                  key={idx}
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
              );
            } else {
              return (
                <SystemNotificationCard
                  key={idx}
                  notificaton={notification}
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
              );
            }
          })}
        </>
      ) : (
        <EmptyNotifications />
      )}
    </div>
  );
}
