import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    let newSocket = null;
    
    if (user) {
      // Connect to socket server
      newSocket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(newSocket);

      // Listen for online users
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }
    
    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.close();
      }
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
