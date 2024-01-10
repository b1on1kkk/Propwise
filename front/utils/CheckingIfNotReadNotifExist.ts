import type { TNotifications } from "@/interfaces/interfaces";

export function CheckingIfNotReadNotifExist(notifications: TNotifications[]) {
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].status === 0) return true;
  }
  return false;
}
