import express from "express";
import { bookGuide } from "../controllers/guide.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.post('/book', protectRoute, bookGuide);

export default router;
