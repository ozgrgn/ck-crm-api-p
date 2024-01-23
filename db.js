import CONFIG from "./config.js";

import mongoose from "mongoose";

const connectToTheMongo = () => {
  mongoose
    .connect(CONFIG.DATABASE.connection_url, {
      user: CONFIG.DATABASE.user,
      pass: CONFIG.DATABASE.password,
      connectTimeoutMS: 1000,
      serverSelectionTimeoutMS: 1000,
      bufferCommands : true
    })
    .catch((err) => {
      console.error("mongoose error", err);

      connectToTheMongo();
    });
};

mongoose.connection.on("disconnected", () => {
  connectToTheMongo();
});

connectToTheMongo();
export default mongoose.connection;