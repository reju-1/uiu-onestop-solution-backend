import express from "express";

// controller functions
import { sendNewsLetter } from "../controllers/newsletter/newsLetterController.js";

// External imports
import configureMulter from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => res.render("newsLetter"));

router.post(
  "/",
  configureMulter("public/uploads/temp").array("files"),
  sendNewsLetter
);

export default router;
