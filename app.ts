import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/v1";

const app = express();

// Parse json request body
app.use(express.json());
app.use(cookieParser());

// use cors to allow cross origin server resource sharing
app.use(cors());

// v1 of Routes
app.use("/v1", routes);

export default app;
