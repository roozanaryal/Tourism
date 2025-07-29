import { useCallback, useState } from "react";
import baseURL from "../Constants/baseURL";

const useGetAttraction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState(null);

  const getAttraction = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${baseURL}/post/getallpost`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to fetch attractions");
      }
      setData(responseData);
      setSuccess("Attractions fetched successfully");
      return responseData;
    } catch (error) {
      setError(error.message || "Failed to fetch attractions");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getAttraction, loading, error, success, data };
};

export default useGetAttraction;
