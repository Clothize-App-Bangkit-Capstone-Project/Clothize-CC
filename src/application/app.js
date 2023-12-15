import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRouter } from "../routes/api";
import { publicRouter } from "../routes/public-api";

export const app = express();
app.use(express.json());

app.use(publicRouter);
app.use(userRouter)

app.use(errorMiddleware);