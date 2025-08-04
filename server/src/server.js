import express, { json } from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import postRoutes from "./routes/post.route.js";
import bookingRoute from "./routes/guidebooking.route.js";
import contactRoute from "./routes/contact.route.js";
// import searchRoute from "./routes/search.route.js";
// import http from "http";

dotenv.config();
const PORT = process.env.PORT || 5000;

export const app = express();

//Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/post", postRoutes);
app.use("/bookguide",bookingRoute);
// app.use("/search", searchRoute);
app.use("/contact",contactRoute)
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Running on ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
