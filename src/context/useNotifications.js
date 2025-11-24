// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5000";

// export default function useNotifications(branch) {
//   const socket = useRef(null);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!branch) return;

//     // Initialize Socket
//     // socket.current = io(SOCKET_URL);

//     const userId = localStorage.getItem("userId");
//     // if (userId) socket.current.emit("join", userId);

//     // Listen for new notifications
//     // socket.current.on("new_notification", (notif) => {
//     //   // Only push notification if branch + role match
//     //   if (notif.branch === branch) {
//     //     setNotifications((prev) => [notif, ...prev]);
//     //   }
//     // });

//     // Fetch existing notifications
//     const fetchNotifications = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/v1/notification/${branch}/${userId}`
//         );
//         const data = await res.json();
//         if (data.success) setNotifications(data.data);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();

//     // return () => socket.current.disconnect();
//   }, [branch]);

//   const markAsRead = async (id) => {
//     const userId = localStorage.getItem("userId"); // লোকালস্টোরেজ থেকে ইউজার আইডি নিলাম

//     try {
//       const res = await fetch(`${SOCKET_URL}/api/v1/notification/${id}/read`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }), // 👈 এখানে userId পাঠাচ্ছি
//       });

//       const data = await res.json();
//       if (data.success) {
//         setNotifications((prev) =>
//           prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//         );
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return { notifications, loading, markAsRead, unreadCount };
// }

import { useEffect, useState } from "react";

const SITE_URL = "http://localhost:5000";
// Define the polling interval (e.g., every 60 seconds)
const POLLING_INTERVAL = 10000;

export default function useNotifications(branch) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!branch) return;

    const userId = localStorage.getItem("userId");

    // 🚀 Function to fetch notifications
    const fetchNotifications = async () => {
      try {
        // You can keep loading as true only for the initial load
        // if you want to avoid a "loading" state during subsequent polls.
        // setLoading(true);

        const res = await fetch(
          `${SITE_URL}/api/v1/notification/${branch}/${userId}`
        );
        const data = await res.json();
        if (data.success) {
          // Update state with the new data
          setNotifications(data.data);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    // 1. Fetch data immediately on mount
    fetchNotifications();

    // 2. Set up the polling interval
    const intervalId = setInterval(fetchNotifications, POLLING_INTERVAL);

    // 3. Clean up the interval when the component unmounts or branch changes
    return () => {
      clearInterval(intervalId);
    };
  }, [branch]); // Rerun effect if 'branch' changes

  // ... (rest of the hook remains the same)

  const markAsRead = async (id) => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(`${SITE_URL}/api/v1/notification/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, loading, markAsRead, unreadCount };
}
