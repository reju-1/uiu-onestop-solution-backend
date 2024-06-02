import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// configuration
import configDir from "./utilities/configDir.js";

// Routing imports
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";
import trackingRouter from "./routers/trackingRouter.js";
import questionBank from "./routers/questionBank.js";
import libraryRouter from "./routers/libraryRouter.js";

// External imports
import { commonErrorHandler, notFoundHandler } from "./middlewares/errors.js";

const app = express();

// Creating Necessary Directories
configDir();
console.log("Directories Created");

// Database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("mondoDb connected successfully");
}

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

// Set view engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.resolve("public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use("/qb", questionBank);
app.use("/library", libraryRouter);

app.use("/tracker", trackingRouter);

// 404 & common error handler
app.use(notFoundHandler);
app.use(commonErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.SERVER_URL}`);
});
