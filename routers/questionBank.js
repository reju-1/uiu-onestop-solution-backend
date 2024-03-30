import express from "express";
// controller functions
import { handleUpload } from "../controllers/qb/qbController.js";

// External imports
import fileUpload from "../middlewares/qb/uploadQuestion.js";
import generateHash from "../middlewares/qb/generateHash.js";

const router = express.Router();
router.get("/", (req, res) => res.render("uploadQ"));

router.post("/upload", fileUpload, generateHash, handleUpload);

export default router;
