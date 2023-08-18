import appServer from "http";
import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";
import database from "@database/config/config";

const server = appServer.createServer(app);
const dbConf = (database as { [key: string]: any })[config.env];

mongoose
  .connect(dbConf.url)
  .then(() => {
    console.log("Database Connected");
    server.listen(config.port, () => {
      console.log(`⚡️[server]: Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log(`Error Connecting to database ${error}`);
    exitHandler();
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
    });
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(`Error occured ${error}`);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
