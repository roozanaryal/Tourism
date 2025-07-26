import { useState } from "react";
import baseURL from "../Constants/Constant.js";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email.trim() || !password) {
        throw new Error("Username or password is empty");
      }
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
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
