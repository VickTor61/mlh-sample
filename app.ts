import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/v1";

const app = express();

// Parse json request body
app.use(express.json());
app.use(cookieParser());

// v1 of Routes
app.use("/v1", routes);

export default app;
