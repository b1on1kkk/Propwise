import { db } from "../global/db";

export function SaveNotifications(notification: {
  user_id: number;
  notif_type: "system" | "friend_request";
  context: string;
  status: boolean;
  timestamp: string;
}) {
  db.query(
    "INSERT INTO notifications SET ?",
    [notification],
    (error: Error) => {
      if (error) return error;
    }
  );
}
