import path from "path";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Routing imports
import trackingRouter from "./routers/trackingRouter.js";
import questionBank from "./routers/questionBank.js";

// External imports
import { commonErrorHandler, notFoundHandler } from "./middlewares/errors.js";

const app = express();
dotenv.config();

// Database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("mondoDb connected successfully");
}

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.resolve("public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/tracker", trackingRouter);
// app.use("/library", "xx");
app.use("/qb", questionBank);
// app.use("/newsletter", "news");

// 404 & common error handler
app.use(notFoundHandler);
app.use(commonErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});
