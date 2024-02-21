import express from "express";

// controller functions
import {
  getLocation,
  updateLocation,
  track,
} from "../controllers/trackingController.js";

const router = express.Router();

router.get("/", getLocation);
router.patch("/", updateLocation);
router.get("/track", track);

export default router;
