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
router.post("/verify", verifyEmail);

export default router;
