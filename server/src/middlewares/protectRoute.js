import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split("Bearer")[1];
      console.log("protectedRoute: found token", token);
    }
    if (!token) {
      return res.status(401).json({
        message: "No authorization, No Token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("protectRoute Decoded JWT", decoded);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;
    console.log("Req user set by protectRoute");
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default protectRoute;
