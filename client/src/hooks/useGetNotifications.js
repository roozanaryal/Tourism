import { useState } from "react";
import { toast } from "react-toastify";
import baseURL from "../Constants/baseURL";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/bookguide/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("neptour-token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch notifications");
      }
      setNotifications(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.message);
      setNotifications([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, notifications, getNotifications, setNotifications };
};

export default useGetNotifications;
