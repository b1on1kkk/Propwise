import { db } from "../global/db";

export function GetFriends(
  user_id: string,
  callback: (error: Error | null, data: any | null) => void
) {
  const query = `
    SELECT users.id, users.name, users.lastname, users.email, users.role, users.avatar,
    friendship.status FROM users 
    JOIN friendship ON users.id = friendship.user1_id OR users.id = friendship.user2_id 
    WHERE (friendship.user1_id = ? OR friendship.user2_id = ?) 
    AND status = 'accepted' AND users.id != ?;
    `;

  db.query(query, [user_id, user_id, user_id], (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
