import { db } from "../global/db";

export function GetNotifications(
  user_id: string,
  callback: (error: Error | null, data: any | null) => void
) {
  const query =
    "SELECT notif_id, notif_type, context, status, timestamp FROM notifications WHERE user_id = ?";

  db.query(query, [user_id], (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
