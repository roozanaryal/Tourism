import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

export const useSocketContext = () => {
  return useContext(SocketContext);
};
