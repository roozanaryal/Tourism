import mongoose from "mongoose";
import User from "./user.model.js";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    placename: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes to speed up search by placename
postSchema.index({ placename: 1 });
postSchema.index({ placename: "text" });

export default mongoose.model("Post", postSchema);
