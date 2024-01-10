import { db } from "../global/db";

export function UpdateNotificationStatus(
  user_id: string,
  callback: (error: Error | null) => void
) {
  const query = `UPDATE notifications SET status = 1 WHERE user_id = ?`;

  db.query(query, [user_id], (err: Error) => {
    callback(err);
  });
}
