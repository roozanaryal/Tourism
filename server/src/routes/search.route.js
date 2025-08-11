import express from "express";
import { searchPosts } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", searchPosts);

export default router;