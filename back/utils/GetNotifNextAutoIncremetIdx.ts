import { db } from "../global/db";

export function GetNotifNextAutoIncremetIdx(
  callback: (error: Error | null, data: any | null) => void
) {
  const query = `SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'propwise' AND TABLE_NAME = 'notifications'`;

  db.query(query, (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
