import { useState } from "react";
import baseURL from "../Constants/baseURL";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [message] = useState([]);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/send/${myid}`, {// set My own id from context
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          body: JSON.stringify({ message }),
        },
      });
      if (!res.ok) {
        throw new Error(res.message || "Failed to send Message");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
