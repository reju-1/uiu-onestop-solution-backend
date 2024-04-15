import express from "express";

// controller functions
import {
  signUp,
  logIn,
  verifyEmail,
} from "../controllers/user/userController.js";

// External imports

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/verify/:token", verifyEmail);

export default router;
