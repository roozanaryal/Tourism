import Post from "../models/post.model.js";

// GET /api/search?q=term&limit=10
// Returns an array of suggestions prioritizing prefix matches
export async function searchPosts(req, res) {
  try {
    const q = (req.query.q || "").trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);

    if (!q) {
      return res.status(200).json([]);
    }

    // Escape regex special chars to avoid ReDoS and invalid patterns
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 1) Prefix matches: ^q
    const prefixMatches = await Post.find({ placename: { $regex: `^${escaped}`, $options: "i" } })
      .select("placename review")
      .limit(limit)
      .lean();

    // If enough, return
    if (prefixMatches.length >= limit) {
      return res.status(200).json(prefixMatches);
    }

    // 2) Contains matches: q anywhere, excluding those already found
    const already = new Set(prefixMatches.map((d) => d.placename.toLowerCase()));
    const remaining = limit - prefixMatches.length;

    const containsMatches = await Post.find({
      placename: { $regex: `${escaped}`, $options: "i" },
    })
      .select("placename review")
      .limit(remaining * 2) // fetch a few more to filter duplicates reliably
      .lean();

    const combined = prefixMatches.slice();
    for (const doc of containsMatches) {
      const key = doc.placename.toLowerCase();
      if (!already.has(key)) {
        combined.push(doc);
        already.add(key);
        if (combined.length >= limit) break;
      }
    }

    return res.status(200).json(combined);
  } catch (err) {
    // Do not leak internal errors
    return res.status(500).json({ message: "Failed to search", error: err?.message || "" });
  }
}
