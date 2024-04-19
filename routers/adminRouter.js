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
// import x from "x";

const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);

router.get("/review-qb", reviewQB);
router.patch("/review-qb", finalizeQuestion);

router.get("/report-qb", getReports);

router.post("/newsletter", sendNewsLetter);
router.post("/book-upload", bookUpload);

export default router;
