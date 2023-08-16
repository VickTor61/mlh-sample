import express from "express";
import routes from "./routes/v1";

const app = express();

// Parse json request body
app.use(express.json());

// v1 of Routes
app.use("/v1", routes);

export default app;
