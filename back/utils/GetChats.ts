import { db } from "../global/db";

export function GetChats(
  user_id: string,
  callback: (error: Error | null, data: any | null) => void
) {
  const query = `
  SELECT chat.*, users.id, users.name, users.lastname, users.email, users.role, users.avatar
  FROM chat
  INNER JOIN users
  ON chat.user1_id = users.id OR chat.user2_id = users.id
  WHERE (chat.user1_id = ? OR chat.user2_id = ?) AND users.id != ?;
    `;

  db.query(query, [user_id, user_id, user_id], (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
