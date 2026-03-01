import express from "express";
import { sendMessage, getChats } from "../controllers/chat.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/", protect, getChats);

export default router;