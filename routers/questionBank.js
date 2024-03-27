import express from "express";
// controller functions
import { handleUpload } from "../controllers/qbController.js";

// External imports
import fileUpload from "../middlewares/qb/uploadQuestion.js";

const router = express.Router();
router.get("/", (req, res) => res.render("uploadQ"));

router.post("/upload", fileUpload, handleUpload);

export default router;
