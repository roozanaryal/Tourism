import { useState } from "react";
import baseURL from "../Constants/baseURL.js";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email.trim() || !password) {
        throw new Error("Username or password is empty");
      }
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
