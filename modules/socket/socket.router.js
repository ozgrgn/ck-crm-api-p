import SocketController from "./socket.controller.js";

const initialize = (io) => {
  io.on("connection", (socket) => {
    console.log("connection in router");
    SocketController.connect(socket);
    socket.on("disconnect", () => {
      console.log("disconnnect in router");
      SocketController.disconnect(socket);
    });
  });
};

export default initialize;
