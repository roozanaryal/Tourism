import { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

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
    } else {
      // If no user, clean up socket
      setSocket((prevSocket) => {
        if (prevSocket) {
          prevSocket.close();
        }
        return null;
      });
    }
    
    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// Add PropTypes validation
SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SocketContext };
