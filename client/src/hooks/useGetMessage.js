import { useState } from "react";
import toast from "react-hot-toast";
import baseURL from "../Constants/baseURL";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const getMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/messages/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch Message");
      }
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, messages, getMessage };
};

export default useGetMessage;
