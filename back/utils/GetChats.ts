import { db } from "../global/db";

export function GetChats(
  user_id: string,
  callback: (error: Error | null, data: any | null) => void
) {
  const query = `
    SELECT chat.chat_id, chat.user1_id, chat.user2_id, chat.chat_status, users.id, users.name,
      users.lastname, users.email, users.role, users.avatar
    FROM
      users
    LEFT JOIN
    chat ON users.id = chat.user1_id OR users.id = chat.user2_id
    WHERE
      users.id != ?
    `;

  db.query(query, [user_id], (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
