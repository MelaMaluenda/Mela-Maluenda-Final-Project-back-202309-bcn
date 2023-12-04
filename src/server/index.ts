import morgan from "morgan";
import express from "express";
import cors from "cors";
import { app } from "./app.js";
import {
  generalError,
  notFound,
} from "./middlewares/error/middlewaresError.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import photoRouter from "../features/photos/router/photoRouter.js";

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const corsOptions = { origin: allowedOrigins };
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

app.use("/", pingRouter);

app.use("/photos", photoRouter);

app.use(notFound);
app.use(generalError);
