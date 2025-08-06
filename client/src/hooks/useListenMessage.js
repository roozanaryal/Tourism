import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";

const useListenMessage = (setMessages) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    
    const handleNewMessage = (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };-

    socket.on("receiveMessage", handleNewMessage);
    
    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};

export default useListenMessage;
