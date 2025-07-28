import { useState } from "react";
import baseURL from "../Constants/baseURL.js";
import { useAuth } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const login = async (username, email, password) => {
    setLoading(true);
    try {
      if (!username.trim() || !email.trim() || !password) {
        throw new Error("All fields are required");
      }
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
        credentials: "include",
      });
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
        console.log(e);
      }
      if (!res.ok) {
        throw new Error(
          data.message || data.error || text || "Login failed, please try again"
        );
      }
      
      // Store token and user data in localStorage
      if (data.token) {
        localStorage.setItem("neptour-token", data.token);
      }
      localStorage.setItem("neptour-user", JSON.stringify(data));
      
      // Update AuthContext to trigger navbar update
      authLogin(data);
      
      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
