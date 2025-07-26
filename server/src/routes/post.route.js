import express from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/getallpost", getAllPost);
router.post("/createpost", createPost);

export default router;
