import { useState } from "react";
import baseURL from "../Constants/Constant.js";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async (username, email, password) => {
    setLoading(true);
    try {
      if (!username.trim() || !email.trim() || !password) {
        throw new Error("Username, email or password is empty");
      }
      const res = await fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed please try again");
      }
      if (!data || !data._id) {
        throw new Error("Invalid response from server");
      }
      console.log(data);
      //setToken
      if (data.token) {
        localStorage.setItem("neptour-token", data.token);
      }
      localStorage.setItem("neptour-user", JSON.stringify(data));
      //now set to authContext

      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignup;
