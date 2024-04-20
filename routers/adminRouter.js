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
} from "../controllers/admin/adminController.js";

// External imports
import configureMulter from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
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

export default router;
