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
import http from "http";

dotenv.config();
const PORT = process.env.PORT || 5000;

export const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
  }
});

// Store online users
let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Get userId from query params
  const userId = socket.handshake.query.userId;
  if (userId) {
    // Add user to online users
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    
    // Emit online users to all clients
    io.emit('getOnlineUsers', onlineUsers);
  }
  
  // Handle sending message
  socket.on('sendMessage', (data) => {
    const { senderId, receiverId, message } = data;
    
    // Find receiver's socket
    const receiver = onlineUsers.find(user => user.userId === receiverId);
    
    if (receiver) {
      io.to(receiver.socketId).emit('receiveMessage', {
        senderId,
        message
      });
    }
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit('getOnlineUsers', onlineUsers);
  });
});

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
    server.listen(PORT, () => {
      console.log(`Server is Running on ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
