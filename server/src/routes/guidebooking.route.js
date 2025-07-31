import express from "express";
import { bookGuide } from "../controllers/guide.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/book', protectRoute, bookGuide);

export default router;
