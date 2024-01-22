import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// socket
import { Socket } from "socket.io";
import type { ClientToServerEvents } from "../front/socket_io_typings";

// database connection
import { db } from "./global/db";

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app: Express = express();

const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

// utils
import { SaveNotifications } from "./utils/SaveNotifications";
import { GetNextAutoIncremetIdx } from "./utils/GetNextAutoIncremetIdx";
import { UpdateNotificationStatus } from "./utils/UpdateNotificationStatus";
import { GetFriends } from "./utils/GetFriends";
import { SaveMessage } from "./utils/SaveMessage";
// algorithms
import { quickSort } from "./utils/QuickSort";
import { binarySearch } from "./utils/BinarySearch";

// MAIN DATA GETTER
import { MAIN_DATA_GETTER } from "./utils/MAIN_DATA_GETTER";
import { GETTER_TYPE } from "./utils/MAIN_DATA_GETTER";
// QUERIES
import {
  GET_USERS_QUERY,
  GET_CHATS_QUERY,
  GET_NOTIFICATIONS_QUERY,
  GET_NEXT_NOTIFICATION_AUTOINCREMET,
  GET_NEXT_MESSAGE_AUTOINCREMET,
  GET_MESSAGES_QUERY
} from "./constants/QUERIES";

// interfaces
import type {
  TOnlineUsers,
  TsendNotificationsTo,
  TCreateChat,
  TSendPrivateMessages,
  TPinMessage,
  TDeleteChat,
  TUpdateStatusMessages,
  TUpdateNotificationStatus,
  TUpdateChatsAfterSendingMessages
} from "./interfaces/interfaces";

////////////////////////////////////////SOCKET IO////////////////////////////////////////

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  }
});

let onlineUsers: TOnlineUsers[] = [];

io.on("connection", (socket: Socket<ClientToServerEvents>) => {
  // check if user is online
  socket.on("userConnected", (data: { new_connected_user_id: number }) => {
    if (binarySearch(onlineUsers, data.new_connected_user_id) === -1) {
      onlineUsers.push({
        user_id: data.new_connected_user_id,
        socket_id: socket.id
      });

      onlineUsers = quickSort(onlineUsers);
    }

    io.emit("getOnlineUsersId", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = [
      ...onlineUsers.filter((user) => user.socket_id !== socket.id)
    ];

    io.emit("getOnlineUsersId", onlineUsers);
  });

  // listen for notifications
  socket.on("sendNotificationsTo", (data: TsendNotificationsTo) => {
    // get next AUTO_INCREMENT index that will be inserted. (this needed to delete notifications correctly, if user want to)
    GetNextAutoIncremetIdx(
      GET_NEXT_NOTIFICATION_AUTOINCREMET,
      (err, next_notification_id) => {
        if (err) return err;

        // find user socket_id
        const socket_id = binarySearch(onlineUsers, data.user_id);

        // if socket_id not null => user is online and we can send him notification straightforward
        if (socket_id) {
          io.to(socket_id).emit("sendNotificationsFrom", {
            notif_id: next_notification_id[0].AUTO_INCREMENT,
            message: data.message,
            notif_type: data.notif_type,
            status: data.status,
            timestamp: data.timestamp
          });

          MAIN_DATA_GETTER(
            data.user_id.toString(),
            GETTER_TYPE.GetUsers,
            GET_USERS_QUERY,
            (err, data) => {
              if (err) return err;

              // send new members data only when error prop is null
              io.to(socket_id).emit("getMembersFromSocket", {
                content: data
              });
            }
          );
        }

        // save notification in database
        SaveNotifications({
          user_id: data.user_id,
          notif_type: data.notif_type,
          context: data.message,
          status: false,
          timestamp: data.timestamp
        });
      }
    );
  });

  // socket to update members data if user send friend request
  socket.on("updateMembers", (data: { user1_id: number; user2_id: number }) => {
    // find users if they are online
    const socket1_id = binarySearch(onlineUsers, data.user1_id);
    const socket2_id = binarySearch(onlineUsers, data.user2_id);

    // if one of the sockets are online - send changed members data
    if (socket1_id) {
      MAIN_DATA_GETTER(
        data.user1_id.toString(),
        GETTER_TYPE.GetUsers,
        GET_USERS_QUERY,
        (err, users) => {
          if (err) return err;

          // send new members data only when error prop is null
          io.to(socket1_id).emit("getMembersFromSocket", {
            content: users
          });
        }
      );
    }

    if (socket2_id) {
      MAIN_DATA_GETTER(
        data.user2_id.toString(),
        GETTER_TYPE.GetUsers,
        GET_USERS_QUERY,
        (err, users) => {
          if (err) return err;

          // send new members data only when error prop is null
          io.to(socket2_id).emit("getMembersFromSocket", {
            content: users
          });
        }
      );
    }
  });

  // socket to update notifications status (read notifications or not)
  socket.on("updateNotificationStatus", (data: TUpdateNotificationStatus) => {
    // first of all update status of each notifications
    UpdateNotificationStatus(data.user_id.toString(), (update_err) => {
      // return if error occur
      if (update_err) return update_err;

      // then parse notifications again
      MAIN_DATA_GETTER(
        data.user_id.toString(),
        GETTER_TYPE.GetNotifications,
        GET_NOTIFICATIONS_QUERY,
        (notif_err, notif_data) => {
          // return if error occur
          if (notif_err) return notif_err;

          // push new notifications to frontend
          io.to(data.socket_id).emit("updatedNotifications", {
            notifications: notif_data
          });
        }
      );
    });
  });

  // create chat functionality
  socket.on("createChat", (data: TCreateChat) => {
    // get value from frontend: user1_id - id user that initiate this chat creation
    // user2_id - user WITH whom initiator wanna create chat
    // to_send_socket_id - socket of the initiator, then send him new friends list
    // chat_status - status that shows which type of chat is (by default is "all")

    const value = {
      user1_id: data.user1_id,
      user2_id: data.user2_id,
      chat_status: data.chat_status
    };

    // create chat by creating data to database
    db.query("INSERT INTO chat SET ?", [value], (error: Error) => {
      if (error) return error;

      // get sockets
      const socket1_id = binarySearch(onlineUsers, data.user1_id);
      const socket2_id = binarySearch(onlineUsers, data.user2_id);

      // check which user is online
      if (socket1_id) {
        MAIN_DATA_GETTER(
          data.user1_id.toString(),
          GETTER_TYPE.GetChats,
          GET_CHATS_QUERY,
          (err, chats) => {
            if (err) return err;

            io.to(socket1_id).emit("updateFriends", {
              chats
            });
          }
        );
      }

      if (socket2_id) {
        MAIN_DATA_GETTER(
          data.user2_id.toString(),
          GETTER_TYPE.GetChats,
          GET_CHATS_QUERY,
          (err, chats) => {
            if (err) return err;

            io.to(socket2_id).emit("updateFriends", {
              chats
            });
          }
        );
      }
    });
  });

  // send private messages
  socket.on("sendPrivateMessage", (message: TSendPrivateMessages) => {
    // get next AUTO_INCREMENT index that will be inserted. (this needed to find message from frontend and set status as read)
    GetNextAutoIncremetIdx(
      GET_NEXT_MESSAGE_AUTOINCREMET,
      (err, next_notification_id) => {
        if (err) return err;

        // find user socket_id to whom send message
        const socket_id = binarySearch(onlineUsers, message.to_send_id);

        // if user is online - send new message to him directly
        if (socket_id) {
          io.to(socket_id).emit("getPrivateMessage", {
            message_id: next_notification_id[0].AUTO_INCREMENT,
            name: message.name,
            lastname: message.lastname,
            sender_id: message.sender_id,
            value: message.value,
            timestamp: message.timestamp,
            status: message.status
          });
        }

        // in any case send message to sender
        io.to(message.sender_socket).emit("getPrivateMessage", {
          message_id: next_notification_id[0].AUTO_INCREMENT,
          name: message.name,
          lastname: message.lastname,
          sender_id: message.sender_id,
          value: message.value,
          timestamp: message.timestamp,
          status: message.status
        });

        // in any case save message in database
        SaveMessage(message);
      }
    );
  });

  // pin message functionality
  socket.on("pinMessage", (data: TPinMessage) => {
    const sql = `UPDATE chat SET chat_status = ? WHERE chat_id = ?`;

    db.query(sql, [data.to_change_status, data.chat_id], (error: Error) => {
      if (error) return error;

      MAIN_DATA_GETTER(
        data.user_id.toString(),
        GETTER_TYPE.GetChats,
        GET_CHATS_QUERY,
        (err, chats) => {
          if (err) return err;

          io.to(data.socket_to_send).emit("updateChats", {
            chats
          });
        }
      );
    });
  });

  socket.on("deleteChat", (data: TDeleteChat) => {
    // create query to delete messages first
    const delete_messages_sql_query = `DELETE FROM messages WHERE chat_id = ?`;

    // request to delete messages
    db.query(delete_messages_sql_query, [data.chat_id], (error: Error) => {
      if (error) return error;

      // create another query to delete chat
      const delete_chat = `DELETE FROM chat WHERE chat_id = ?`;

      // request
      db.query(delete_chat, [data.chat_id], (error: Error) => {
        if (error) return error;

        // get sockets of users
        const socket1_id = binarySearch(onlineUsers, data.user1_id);
        const socket2_id = binarySearch(onlineUsers, data.user2_id);

        // check if one of the socket is null
        if (socket1_id) {
          MAIN_DATA_GETTER(
            data.user1_id.toString(),
            GETTER_TYPE.GetChats,
            GET_CHATS_QUERY,
            (err, chats) => {
              if (err) return err;

              io.to(socket1_id).emit("updateChats", {
                chats
              });
            }
          );
        }

        if (socket2_id) {
          MAIN_DATA_GETTER(
            data.user2_id.toString(),
            GETTER_TYPE.GetChats,
            GET_CHATS_QUERY,
            (err, chats) => {
              if (err) return err;

              io.to(socket2_id).emit("updateChats", {
                chats
              });
            }
          );
        }
      });
    });
  });

  socket.on("updateStatusMessages", (data: TUpdateStatusMessages) => {
    if (data.indexes_to_update.length > 0) {
      const sql = `UPDATE messages SET status = 1 WHERE message_id IN (?)`;

      db.query(sql, [data.indexes_to_update], (err: Error) => {
        if (err) return err;

        // get online users sockets
        const socket1_id = binarySearch(onlineUsers, data.user1_id);
        const socket2_id = binarySearch(onlineUsers, data.user2_id);

        // get new messages
        MAIN_DATA_GETTER(
          data.chat_id.toString(),
          GETTER_TYPE.GetMessages,
          GET_MESSAGES_QUERY,
          (message_err, messages) => {
            if (message_err) return message_err;

            io.to(socket1_id).to(socket2_id).emit("getUpdatedMessages", {
              messages
            });
          }
        );
      });
    }
  });

  // send updated chat to each user
  socket.on(
    "updateChatsAfterSendingMessages",
    (data: TUpdateChatsAfterSendingMessages) => {
      const socket1_id = binarySearch(onlineUsers, data.user1_id);
      const socket2_id = binarySearch(onlineUsers, data.user2_id);

      io.to(socket1_id)
        .to(socket2_id)
        .emit("getUpdatedDataAfterSendingMessage", {
          chat_id: data.chat_id,
          value: data.value,
          timestamp: data.timestamp,
          sender_id: data.user1_id,
          status: data.status
        });
    }
  );

  // send status of message (read or not) to each users if one of them is online
  socket.on(
    "updateReadMessageInChatSide",
    (data: {
      chat_id: number;
      status: number;
      user1_id: number;
      user2_id: number;
    }) => {
      const socket1_id = binarySearch(onlineUsers, data.user1_id);
      const socket2_id = binarySearch(onlineUsers, data.user2_id);

      io.to(socket1_id).to(socket2_id).emit("getUpdateReadMessageInChatSide", {
        chat_id: data.chat_id,
        status: data.status
      });
    }
  );
});

instrument(io, {
  auth: false
});

////////////////////////////////////////MIDDLEWARES////////////////////////////////////////

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////POST////////////////////////////////////////

// log in user
app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);

      // when user was found
      if (result.length > 0) {
        // generate new hash-key
        const new_hashkey = uuidv4();

        // then update old hash-key with brand new one
        db.query(
          "UPDATE users SET hash_key = ? WHERE hash_key = ?",
          [new_hashkey, result[0].hash_key],
          (error: Error) => {
            if (error) return res.status(500).send(error);
          }
        );

        // set new cookie
        res.cookie("user_hashkey", new_hashkey, {
          maxAge: 14 * 24 * 3600000, // cookie exist for 2 week
          httpOnly: true
        });

        return res.status(200).send("Logged in!");
      }

      return res.status(500).send("User is not found!");
    }
  );
});

// sing up user
app.post("/sing_up", (req: Request, res: Response) => {
  db.query("INSERT INTO users SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);
  });

  res.cookie("user_hashkey", req.body.hash_key, {
    maxAge: 14 * 24 * 3600000, // cookie exist for 2 week
    httpOnly: true
  });

  return res.status(200).send("Successfully!");
});

// check session status
app.post("/session_status", (req: Request, res: Response) => {
  const { key } = req.body;

  db.query(
    "SELECT * FROM users WHERE hash_key = ?",
    [key],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);

      if (result.length > 0) {
        return res.status(200).json({
          status: 200,
          message: "Logged!"
        });
      }

      return res.status(401).json({ status: 401, message: "Log in first!" });
    }
  );
});

// create new event
app.post("/insert_event", (req: Request, res: Response) => {
  db.query("INSERT INTO events SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Event inserted succesfully!");
  });
});

// create relation ship based on first user id (logged user) and second user id (person whom request was sent)
app.post("/create_friendship", (req: Request, res: Response) => {
  db.query("INSERT INTO friendship SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Request to create friendship sent!");
  });
});

////////////////////////////////////////GET////////////////////////////////////////

// get logged user based on hash_key
app.get("/logged_user", (req: Request, res: Response) => {
  db.query(
    "SELECT id, name, lastname, email, avatar, role FROM users WHERE hash_key = ?",
    [req.cookies.user_hashkey],
    (error: Error, result: any) => {
      if (error) return res.status(500).send("Server error occur :(");

      return res.status(200).json(result);
    }
  );
});

// get events based on month and user_id
app.get("/events", (req: Request, res: Response) => {
  const { user_id, month } = req.query;

  db.query(
    "SELECT * FROM events WHERE user_id = ? AND month = ?",
    [user_id, month],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);

      return res.status(200).json(result);
    }
  );
});

// get all users except logged in user, also get friendship status: accepted, pending, declined
app.get("/members", (req: Request, res: Response) => {
  const { user_id } = req.query;

  MAIN_DATA_GETTER(
    user_id as string,
    GETTER_TYPE.GetUsers,
    GET_USERS_QUERY,
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    }
  );
});

// get friends of logged user
app.get("/get_friends", (req: Request, res: Response) => {
  const { user_id } = req.query;

  GetFriends(user_id as string, (err, result) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(result);
  });
});

// get logged user chats
app.get("/chats", (req: Request, res: Response) => {
  const { user_id } = req.query;

  MAIN_DATA_GETTER(
    user_id as string,
    GETTER_TYPE.GetChats,
    GET_CHATS_QUERY,
    (err, chats) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(chats);
    }
  );
});

// get notifications
app.get("/notificaitons", (req: Request, res: Response) => {
  const { user_id } = req.query;

  MAIN_DATA_GETTER(
    user_id as string,
    GETTER_TYPE.GetNotifications,
    GET_NOTIFICATIONS_QUERY,
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    }
  );
});

app.get("/messages", (req: Request, res: Response) => {
  const { chat_id } = req.query;

  MAIN_DATA_GETTER(
    chat_id as string,
    GETTER_TYPE.GetMessages,
    GET_MESSAGES_QUERY,
    (message_err, messages) => {
      if (message_err) return res.status(500).send(message_err);

      return res.status(200).json(messages);
    }
  );
});

////////////////////////////////////////PUT////////////////////////////////////////

// update friendship status
app.put("/update_friendship", (req: Request, res: Response) => {
  const { user1_id, user2_id, status } = req.body;

  const sql = `UPDATE friendship SET status = ? WHERE user1_id = ? AND user2_id = ?`;

  db.query(sql, [status, user1_id, user2_id], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Friendship status updated!");
  });
});

////////////////////////////////////////DELETE////////////////////////////////////////

app.delete("/delete_notification", (req: Request, res: Response) => {
  const { notif_id } = req.body;

  const sql = `DELETE FROM notifications WHERE notif_id = ?`;

  db.query(sql, [notif_id], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Notification deleted successfully!");
  });
});

app.delete("/delete_friendship", (req: Request, res: Response) => {
  const { user1_id, user2_id } = req.body;

  const sql = `DELETE FROM friendship WHERE user1_id = ? AND user2_id = ?`;

  db.query(sql, [user1_id, user2_id], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Friendship has been declined!");
  });
});

server.listen(2000, () => {
  console.log(`http://localhost:${2000}`);
});
