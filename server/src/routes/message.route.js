import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send", protectRoute, sendMessage);
router.post("/get", protectRoute, getMessage);

export default router;
