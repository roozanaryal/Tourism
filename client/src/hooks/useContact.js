import { useState } from "react";
import baseURL from "../Constants/baseURL.js";

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const contact = async (
    firstName,
    lastName, 
    address,
    phone,
    email,
    message
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!firstName || !lastName || !address || !phone || !email || !message) {
        throw new Error("All fields are required");
      }
      const res = await fetch(`${baseURL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          phone,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to submit contact form"
        );
      }
      setSuccess(true);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message || "Something went wrong");
      setLoading(false);
      throw error;
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { contact, loading, error, success, reset };
};

export default useContact;
