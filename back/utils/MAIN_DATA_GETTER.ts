import { db } from "../global/db";

export enum GETTER_TYPE {
  GetUsers = "GetUsers",
  GetNotifications = "GetNotifications",
  GetChats = "GetChats",
  GetMessages = "GetMessages"
}

export function MAIN_DATA_GETTER(
  user_id: string,
  TYPE: GETTER_TYPE,
  MYSQL_QUERY: string,
  callback: (error: Error | null, data: any | null) => void
) {
  switch (TYPE) {
    case GETTER_TYPE.GetUsers: {
      db.query(
        MYSQL_QUERY,
        [user_id, user_id, user_id],
        (err: Error, results: any) => {
          if (err) return callback(err, null);

          return callback(null, results);
        }
      );
      break;
    }

    case GETTER_TYPE.GetChats: {
      db.query(
        MYSQL_QUERY,
        [user_id, user_id, user_id],
        (err: Error, results: any) => {
          if (err) return callback(err, null);

          return callback(null, results);
        }
      );
      break;
    }

    case GETTER_TYPE.GetNotifications: {
      db.query(MYSQL_QUERY, [user_id], (err: Error, results: any) => {
        if (err) return callback(err, null);

        return callback(null, results);
      });
      break;
    }

    case GETTER_TYPE.GetMessages: {
      db.query(MYSQL_QUERY, [user_id], (err: Error, results: any) => {
        if (err) return callback(err, null);

        return callback(null, results);
      });
      break;
    }
  }
}
