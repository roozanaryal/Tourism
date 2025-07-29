import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAddPost from "../hooks/useAddPost";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";

export default function AddPost() {
  const [placename, setPlacename] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const { addPost, loading, error, success, user } = useAddPost();

  // Redirect if user is not admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost(placename, review);
      setPlacename("");
      setReview("");

      // Navigate to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      // Error is handled in the hook
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Place</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputBox
          label="Place Name"
          type="text"
          value={placename}
          onChange={(e) => setPlacename(e.target.value)}
          required
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Review (1-5)
          </label>
          <select
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primarycolor"
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Place"}
        </Button>
      </form>
    </div>
  );
}
