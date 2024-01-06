import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mysql = require("mysql");

const app: Express = express();

const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

////////////////////////////////////////SOCKET IO////////////////////////////////////////

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

let onlineUsers: { user_id: number; socket_id: string }[] = [];

io.on("connection", (socket: any) => {
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
});

instrument(io, {
  auth: false
});

////////////////////////////////////////DATABASE CONNECTION////////////////////////////////////////

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "propwise"
});

////////////////////////////////////////MIDDLEWARES////////////////////////////////////////

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////POST////////////////////////////////////////

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

app.post("/insert_event", (req: Request, res: Response) => {
  db.query("INSERT INTO events SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);

    return res.status(200).send("Event inserted succesfully!");
  });
});

////////////////////////////////////////GET////////////////////////////////////////

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

server.listen(2000, () => {
  console.log(`http://localhost:${2000}`);
});
