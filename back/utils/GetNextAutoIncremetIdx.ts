import { db } from "../global/db";

export function GetNextAutoIncremetIdx(
  query: string,
  callback: (error: Error | null, data: any | null) => void
) {
  db.query(query, (err: Error, results: any) => {
    if (err) return callback(err, null);

    return callback(null, results);
  });
}
