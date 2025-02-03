import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "express-compression";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";
import loggerRouter from "./routes/logger.router.js";

import { errorHandler } from "./middleware/errorHandlers.js";
import addLogger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(addLogger);
app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/logger", loggerRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
