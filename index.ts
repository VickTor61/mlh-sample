import dotenv from "dotenv";
import appServer from "http";
import app from "./app";

dotenv.config();

const server = appServer.createServer(app)

// const app: Express = express();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});
