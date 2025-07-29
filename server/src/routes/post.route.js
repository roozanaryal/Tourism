import express from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.get("/getallpost", getAllPost);
router.post("/createpost", protectRoute, adminMiddleware, createPost);

export default router;
