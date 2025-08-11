import { useState } from "react";
import { toast } from "react-toastify";
import { useSocketContext } from "./useSocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Get sender details from localStorage
      const currentUser = JSON.parse(localStorage.getItem("neptour-user"));
      const senderId = currentUser._id;
      
      // Send message through socket for real-time delivery
      if (socket) {
        socket.emit("sendMessage", {
          senderId,
          message
        });
      }
      
      // Return a success response
      return { success: true };
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
