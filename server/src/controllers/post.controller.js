import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const owner = req.user._id;
    const { placename, review } = req.body;

    // Check if user is authenticated
    if (!owner) {
      return res
        .status(400)
        .json({ message: "You are not logged In or Token is expired" });
    }

    // Check if user is admin (only admins can create places)
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can add places." });
    }

    if (!placename || !review) {
      return res
        .status(400)
        .json({ message: "Place name or review is missing on the post" });
    }
    
    // For admin-created places, we can use the admin's ID as owner
    const newPost = new Post({
      owner,
      placename,
      review,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    //find all posts as posts need to be shown even when we are not logged in
    const posts = await Post.find({});
    if (!posts || posts.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
