import { Children, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ Children }) => {
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5173", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUser", (users) => {
        setOnlineUser(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
