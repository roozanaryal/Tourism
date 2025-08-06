import { useState } from "react";
import baseURL from "../Constants/baseURL";
import { toast } from "react-toastify";
import { useSocketContext } from "../Context/SocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();

  const sendMessage = async (message, receiverId) => {
    setLoading(true);
    try {
      // Send message through socket for real-time delivery
      if (socket) {
        socket.emit("sendMessage", {
          senderId: JSON.parse(localStorage.getItem("neptour-user"))._id,
          receiverId,
          message
        });
      }
      
      // Also save to database
      const res = await fetch(`${baseURL}/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("neptour-token")}`
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send Message");
      }
      
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, sendMessage };
};

export default useSendMessage;
