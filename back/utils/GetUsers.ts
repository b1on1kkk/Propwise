import { db } from "../global/db";

export function GetUsers(
  callback: (error: Error | null, data: any | null) => void,
  user_id: string
) {
  const query = `
    SELECT 
      users.id, users.name, users.lastname, users.email, users.role, users.avatar,
      friendship.status
  FROM 
      users
  LEFT JOIN 
      friendship ON users.id = friendship.user1_id OR users.id = friendship.user2_id
  WHERE
      users.id != ?
    `;

  db.query(query, [user_id], (err: Error, results: any) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, results);
  });
}
