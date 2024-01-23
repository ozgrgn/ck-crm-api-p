import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import db from "./db.js";
const port = parseInt(process.env.PORT) || 3000;
import CONFIG from "./config.js";
import booleanParser from "express-query-boolean";
import jwtParser from "./modules/middlewares/jwtParser.js";
import moment from "moment-timezone";
import cors from "cors";

import { Server } from "socket.io";

const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

moment.tz.setDefault("Europe/Istanbul");

app.use(booleanParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" })); 

app.use(jwtParser);
app.use((req, res, next) => {
  if (req) {
    req.clientIp = req.ip;
  }
  next();
});
app.use(cors());

import routes from "./modules/routes.js";

routes(app);

import socketRouter from "./modules/socket/socket.router.js";
socketRouter(socketIO);

db.on("connected", async () => {
  console.log("DB connected");
});

app.get("/", async (req, res) => {
  return res.json({ message: "Hello World !" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(
    `${CONFIG.INTERNAL.PROJECT_ID} API listening on port 0.0.0.0:${port}`
  );
});
