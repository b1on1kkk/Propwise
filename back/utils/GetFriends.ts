import { db } from "../global/db";

export function GetFriends(
  user_id: string,
  callback: (error: Error | null, data: any | null) => void
) {
  const query = `
  SELECT
    users.id, users.name, users.lastname, users.email, users.role, users.avatar,
    friendship.status,
    CASE 
        WHEN chat.user1_id IS NOT NULL OR chat.user2_id IS NOT NULL THEN 'Yes'
        ELSE 'No'
    END AS isInChat
  FROM
    users
  LEFT JOIN
    friendship ON users.id = friendship.user1_id OR users.id = friendship.user2_id
  LEFT JOIN
    chat ON users.id = chat.user1_id OR users.id = chat.user2_id
  WHERE
    (users.id != ? AND friendship.status = 'accepted')
    `;

  db.query(query, [user_id], (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
