import User from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    // First check if user is authenticated (using existing protectRoute logic)
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Check if the user is an admin
    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admin rights required.",
      });
    }

    // If user is admin, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default adminMiddleware;
