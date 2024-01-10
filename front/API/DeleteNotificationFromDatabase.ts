import axios from "axios";

// interfaces
import type { TNotifications } from "@/interfaces/interfaces";

export async function DeleteNotificationFromDatabase(
  notif_id: number,
  notifications: TNotifications[]
) {
  // getting 2 variables as a prop
  try {
    // send delete request to server and database
    await axios.delete("http://localhost:2000/delete_notification", {
      data: {
        notif_id
      }
    });
    // if everyting ok - return filtered array without deleted
    return notifications.filter(
      (notification) => notification.notif_id !== notif_id
    );
  } catch (error) {
    console.log(error);
  }

  // if error occur - return notifications array without changes
  return notifications;
}
