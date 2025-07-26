import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const owner = req.user._id;
    const { description, photo } = req.body;

    if (!owner) {
      return res
        .status(400)
        .json({ message: "You are not logged In or Token is expired" });
    }

    if (!description || !photo) {
      return res
        .status(400)
        .json({ message: "Description or photo is missing on the post" });
    }
    const newPost = new Post({
      owner,
      description,
      photo,
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

//SomeFixes need to be applied on this
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
