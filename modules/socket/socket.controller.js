import jwt from "jsonwebtoken";
import CONFIG from "../../config.js";
const connections = {};
import RequestService from "../request/service.js";

const connect = (socket) => {
  console.log();
  if (!socket.handshake.auth || !decodeToken(socket.handshake.auth.token)) {
    console.log("not auth", socket.handshake.auth);
    socket.disconnect();
    return;
  }

  let decodedToken = decodeToken(socket.handshake.auth.token);
  console.log("socket connection", decodedToken.adminId);
  connections[decodedToken.adminId] = socket;
};

const disconnect = (socket) => {
  let decodedToken = decodeToken(socket.handshake.auth.token);

  delete connections[decodedToken.adminId];
  console.log("socket disconnected");
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, CONFIG.JWT.secret);
    if (decoded) {
      return decoded;
    }

    return false;
  } catch (err) {
    console.log(err.message, "socket jwt parser error");
    return false;
  }
};

RequestService.globalEvents.addListener("confetti", () => {
  console.log("confeetti in socket controller");
  Object.values(connections).map((connection) => {
    connection.emit("confetti");
  });
});

export default {
  connect,
  disconnect,
};
