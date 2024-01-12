import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { ClientToServerEvents } from "../front/socket_io_typings";

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
import { FindUser } from "./utils/FindUser";
import { SaveNotifications } from "./utils/SaveNotifications";
import { GetUsers } from "./utils/GetUsers";
import { GetNotifNextAutoIncremetIdx } from "./utils/GetNotifNextAutoIncremetIdx";
import { UpdateNotificationStatus } from "./utils/UpdateNotificationStatus";
import { GetNotifications } from "./utils/GetNotifications";
import { GetFriends } from "./utils/GetFriends";
import { GetChats } from "./utils/GetChats";
import { SaveMessage } from "./utils/SaveMessage";

// interfaces
import type {
  TonlineUsers,
  TsendNotificationsTo,
  TCreateChat,
  SendPrivateMessages
} from "./interfaces/interfaces";

////////////////////////////////////////SOCKET IO////////////////////////////////////////

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

let onlineUsers: TonlineUsers[] = [];

io.on("connection", (socket: Socket<ClientToServerEvents>) => {
  // check if user is online
  socket.on("userConnected", (data: { new_connected_user_id: number }) => {
    if (
      !onlineUsers.some((user) => user.user_id === data.new_connected_user_id)
    ) {
      onlineUsers.push({
        user_id: data.new_connected_user_id,
        socket_id: socket.id
      });
    }

    io.emit("getOnlineUsersId", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = [
      ...onlineUsers.filter((user) => user.socket_id !== socket.id)
    ];

    io.emit("getOnlineUsersId", onlineUsers);
  });
  //

  // listen for notifications
  socket.on("sendNotificationsTo", (data: TsendNotificationsTo) => {
    // get next AUTO_INCREMENT index that well be inserted. (this needed to delete notifications correctly, if user want to)
    GetNotifNextAutoIncremetIdx((err, next_notification_id) => {
      if (err) return err;

      // find user socket_id
      const socket_id = FindUser(data.user_id, onlineUsers);

      // if socket_id not null => user is online and we can send him notification straightforward
      if (socket_id) {
        io.to(socket_id).emit("sendNotificationsFrom", {
          notif_id: next_notification_id[0].AUTO_INCREMENT,
          message: data.message,
          notif_type: data.notif_type,
          status: data.status,
          timestamp: data.timestamp
        });

        // send updated members to client side if socket_id was found
        GetUsers(data.user_id.toString(), (err, data) => {
          // send new members data only when error prop is null
          if (!err) {
            io.to(socket_id).emit("getMembersFromSocket", {
              content: data
            });
          }
        });
      }

      // save notification in database
      SaveNotifications({
        user_id: data.user_id,
        notif_type: data.notif_type,
        context: data.message,
        status: false,
        timestamp: data.timestamp
      });
    });
  });

  // socket to update members data if user send friend request
  socket.on("updateMembers", (data: { user1_id: number; user2_id: number }) => {
    // find users if they are online
    const socket1_id = FindUser(data.user1_id, onlineUsers);
    const socket2_id = FindUser(data.user2_id, onlineUsers);

    // if one of the sockets are online - send changed members data
    if (socket1_id) {
      GetUsers(data.user1_id.toString(), (err, data) => {
        if (!err) {
          io.to(socket1_id).emit("getMembersFromSocket", {
            content: data
          });
        }
      });
    }

    if (socket2_id) {
      GetUsers(data.user2_id.toString(), (err, data) => {
        if (!err) {
          io.to(socket2_id).emit("getMembersFromSocket", {
            content: data
          });
        }
      });
    }
  });

  // socket to update notifications status (read notifications or not)
  socket.on(
    "updateNotificationStatus",
    (data: { user_id: number; socket_id: string }) => {
      // first of all update status of each notifications
      UpdateNotificationStatus(data.user_id.toString(), (update_err) => {
        // return if error occur
        if (update_err) return update_err;

        // then parse notifications again
        GetNotifications(data.user_id.toString(), (notif_err, notif_data) => {
          // return if error occur
          if (notif_err) return notif_err;

          // push new notifications to frontend
          io.to(data.socket_id).emit("updatedNotifications", {
            notifications: notif_data
          });
        });
      });
    }
  );

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

    // get socket of second user with whom we wanna start chat (socket will not be null only when user is online)
    // in other case user will get data by fetching if directly from database
    const socket_id = FindUser(data.user2_id, onlineUsers);

    // create chat by creating data to database
    db.query("INSERT INTO chat SET ?", [value], (error: Error) => {
      if (error) return error;

      // reget data about "free" friends or friends that are not have chat with initiator
      GetFriends(data.user1_id.toString(), (err, friends) => {
        if (err) return err;

        // if socket is not null => user is online, so, send data to initiator (his data) of this chat and his new friend (him another data)
        if (socket_id) {
          GetChats(data.user1_id.toString(), (err, chats) => {
            if (err) return err;

            io.to(data.to_send_socket_id).emit("updateFriendsWithoutChat", {
              friends,
              chats
            });
          });

          GetChats(data.user2_id.toString(), (err, chats) => {
            if (err) return err;

            io.to(socket_id).emit("updateFriendsWithoutChat", {
              friends,
              chats
            });
          });

          return;
        }

        // if second user is not online => send just initiator
        GetChats(data.user1_id.toString(), (err, chats) => {
          if (err) return err;

          // push data to frontend
          io.to(data.to_send_socket_id).emit("updateFriendsWithoutChat", {
            friends,
            chats
          });
        });
      });
    });
  });

  // send private messages
  socket.on("sendPrivateMessage", (message: SendPrivateMessages) => {
    // find user socket_id to whom send message
    const socket_id = FindUser(message.to_send_id, onlineUsers);

    // if user is online - send new message to him directly
    if (socket_id) {
      io.to(socket_id).emit("getPrivateMessage", {
        name: message.name,
        lastname: message.lastname,
        sender_id: message.sender_id,
        value: message.value,
        timestamp: message.timestamp
      });
    }

    // in any case send message to sender
    io.to(message.sender_socket).emit("getPrivateMessage", {
      name: message.name,
      lastname: message.lastname,
      sender_id: message.sender_id,
      value: message.value,
      timestamp: message.timestamp
    });

    // in any case save message in database
    SaveMessage(message);
  });
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

// logg in user
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

  // get users inf using custom function
  GetUsers(user_id as string, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
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

  GetChats(user_id as string, (err, result) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(result);
  });
});

// get notifications
app.get("/notificaitons", (req: Request, res: Response) => {
  const { user_id } = req.query;

  GetNotifications(user_id as string, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
});

// update friendship status
app.put("/update_friendship", (req: Request, res: Response) => {
  const { user1_id, user2_id, status } = req.body;

  const sql = `UPDATE friendship SET status = ? WHERE user1_id = ? AND user2_id = ?`;

  db.query(sql, [status, user1_id, user2_id], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Friendship status updated!");
  });
});

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

app.get("/messages", (req: Request, res: Response) => {
  const { chat_id } = req.query;

  db.query(
    `
    SELECT messages.timestamp, messages.value, messages.sender_id, users.name, users.lastname
    FROM messages
    INNER JOIN users
    ON messages.sender_id = users.id 
    WHERE messages.chat_id = ?;
    `,
    [chat_id],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);

      return res.status(200).json(result);
    }
  );
});

server.listen(2000, () => {
  console.log(`http://localhost:${2000}`);
});
