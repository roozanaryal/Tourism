import express from "express";
import { bookGuide, getBookingNotifications } from "../controllers/guide.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/book', protectRoute, bookGuide);

// Get all booking notifications (for notification tab)
import adminMiddleware from "../middlewares/adminMiddleware.js";
router.get('/notifications', protectRoute, adminMiddleware, getBookingNotifications);

export default router;
