import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mysql = require("mysql");

const app: Express = express();

// database connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "propwise"
});

// middlewares
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
app.use(
  session({
    key: "user_id",
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 10800000
    }
  })
);

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);

      console.log(result);

      if (result.length > 0) {
        req.session!.user_key = result[0].hash_key;
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

  req.session!.user_key = req.body.hash_key;

  return res.status(200).send("Successfully!");
});

app.get("/logged_user", (req: Request, res: Response) => {
  db.query(
    "SELECT id, name, lastname, email, avatar, role FROM users WHERE hash_key = ?",
    [req.session?.user_key],
    (error: Error, result: any) => {
      if (error) return res.status(500).send("Server error occur :(");
      if (result.length === 0)
        res
          .status(401)
          .json({ code: 401, message: "To get data logged in first" });

      return res.status(200).json(result);
    }
  );
});

app.get("/session_status", (req: Request, res: Response) => {
  if (req.session?.user_key) {
    return res.json({
      status: 200,
      message: "Logged!"
    });
  } else {
    return res.json({ status: 401, message: "Log in first!" });
  }
});

app.listen(2000, () => {
  console.log(`http://localhost:${2000}`);
});
