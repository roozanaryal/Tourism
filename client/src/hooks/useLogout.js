import { useState } from "react";
import baseURL from "../Constants/baseURL.js";
import { useAuth } from "../Context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }

      // Clear user data from context and localStorage
      logout();
      
      return data;
    } catch (error) {
      throw new Error(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { logout: handleLogout, loading };
};

export default useLogout;
