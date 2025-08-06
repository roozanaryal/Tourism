import { useState } from "react";
import { toast } from "react-toastify";
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
          Authorization: `Bearer ${localStorage.getItem("neptour-token")}`,
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
      return data;
    } catch (error) {
      toast.error(error.message);
      setMessages([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, messages, getMessage, setMessages };
};

export default useGetMessage;
