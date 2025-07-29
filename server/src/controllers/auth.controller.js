import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    const profilePic = `http://avatar.iran.liara.run/public/boy?${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      await newUser.save();
      const token = generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
        isAdmin: newUser.isAdmin,
        token: token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {

    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password ,email} = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!email) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in login",
      success: false,
      error: true,
    });
  }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            message: "Logout successful",
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: "error in logout",
            success: false,
            error: true,
        });
    }
}