import express from "express";

// controller functions
import { handleUpload } from "../controllers/qb/qbController.js";

// External imports
import fileUpload from "../middlewares/qb/uploadQuestion.js";
import { calculateHash, compareHash } from "../middlewares/qb/hash.js";

const router = express.Router();
router.get("/", (req, res) => res.render("uploadQ"));

router.post("/upload", fileUpload, calculateHash, compareHash, handleUpload);

export default router;
