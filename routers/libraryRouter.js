import express from "express";

// controller functions
import {
  getBooks,
  searchBook,
} from "../controllers/library/libraryController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/search", searchBook);

export default router;
