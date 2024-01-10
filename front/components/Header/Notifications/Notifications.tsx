// components
import FriendRequestNotificationCard from "../FriendRequestNotificationCard/FriendRequestNotificationCard";
import SystemNotificationCard from "../SystemNotificationCard/SystemNotificationCard";
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// API
import { AttestToBeFriends } from "@/API/AttestToBeFriends";
import { DeleteNotificationFromDatabase } from "@/API/DeleteNotificationFromDatabase";

// interfaces
import type { TNotificationsModal } from "@/interfaces/interfaces";

export default function Notifications({
  notifications,
  setNotifications
}: TNotificationsModal) {
  const { user, socket, setMembers } = useGlobalModalStatus();

  return (
    <div className="w-[300px] border-1 shadow-md bg-white h-[400px] absolute right-0 top-11 rounded-lg z-30 p-4 overflow-auto">
      {notifications.length > 0 ? (
        <>
          {notifications.map((notification, idx) => {
            if (notification.notif_type === "friend_request") {
              return (
                <FriendRequestNotificationCard
                  key={idx}
                  notification={notification}
                  CreateFriendship={() =>
                    AttestToBeFriends(
                      notifications[idx].context.user.id,
                      user[0].id,
                      socket,
                      setMembers
                    )
                  }
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
