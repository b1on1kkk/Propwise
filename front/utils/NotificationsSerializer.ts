// interfaces
import type {
  TNotificationsFromDatabase,
  TNotifications
} from "@/interfaces/interfaces";

export function NotificationsSerializer(
  notifications: TNotificationsFromDatabase[]
) {
  // create temp variable to serialize context field from JSON to normal obj
  const serializedNotifications: TNotifications[] = [];

  // serializing...
  notifications.forEach((notif) => {
    serializedNotifications.push({
      ...notif,
      context: JSON.parse(notif.context)
    });
  });

  return serializedNotifications;
}
