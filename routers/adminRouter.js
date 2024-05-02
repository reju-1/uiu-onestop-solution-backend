import express from "express";

// controller functions
import {
  signup,
  login,
  reviewQB,
  finalizeQuestion,
  getReports,
  bookUpload,
  sendNewsLetter,
  uploadEvent,
  getEvents,
  getEventByID,
  
} from "../controllers/admin/adminController.js";

import { deleteEvent } from "../controllers/admin/event.js";

import { deleteBook, getAllBooks } from "../controllers/admin/bookUpload.js";

// External imports
import configureMulter from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.get("/login", login);

router.get("/review-qb", reviewQB);
router.patch("/review-qb", finalizeQuestion);

router.get("/report-qb", getReports);

router.post(
  "/newsletter",
  configureMulter("public/uploads/temp").array("files"),
  sendNewsLetter
);
router.get("/newsletter", (req, res) => res.render("newsLetter"));

router.post(
  "/book-upload",
  configureMulter("public/uploads/books").fields([
    { name: "logo", maxCount: 1 },
    { name: "book", maxCount: 1 },
  ]),
  bookUpload
);

router.get("/book", getAllBooks)
router.delete("/book/:id", deleteBook)




router.post(
  "/event",
  configureMulter("public/uploads/events").single("logo"),
  uploadEvent
);
router.get("/event", getEvents);
router.get("/event/:id", getEventByID);
router.delete("/event/:id", deleteEvent);

export default router;
