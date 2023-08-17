import appServer from "http";
import config from "./config/config";
import app from "./app";

const server = appServer.createServer(app);

server.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running on port ${config.port}`);
});
