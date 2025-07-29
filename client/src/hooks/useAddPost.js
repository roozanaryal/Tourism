import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import baseURL from "../Constants/baseURL";

const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const addPost = async (placename, review) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("neptour-token");

      // Check if token exists
      if (!token) {
        throw new Error(
          "Authentication token not found. Please log out and log back in."
        );
      }

      const response = await fetch(`${baseURL}/post/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ placename, review: parseInt(review) }),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If it's an HTML response, it's likely an error page
        if (contentType && contentType.includes("text/html")) {
          throw new Error(
            "Authentication error. Please log out and log back in."
          );
        }
        throw new Error(
          "Server returned an invalid response. Please try again."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        // If it's a 401 error, it's likely a token issue
        if (response.status === 401) {
          throw new Error(
            data.message ||
              "Authentication error. Please log out and log back in."
          );
        }
        throw new Error(data.message || "Failed to create post");
      }

      setSuccess("Place added successfully!");
      return data;
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addPost, loading, error, success, user };
};

export default useAddPost;
