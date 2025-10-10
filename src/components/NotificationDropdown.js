// import React from "react";
// import useNotifications from "../context/useNotifications";

// const NotificationDropdown = ({ branch, role }) => {
//   const { notifications, loading, markAsRead, unreadCount } = useNotifications(
//     branch,
//     role
//   );

//   console.log("First notification:", branch, role, notifications[0]);
//   if (loading) return <p>Loading notifications...</p>;

//   return (
//     <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//       <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
//         {notifications.length === 0 && (
//           <li className="px-4 py-2">No notifications</li>
//         )}
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//               notif.isRead ? "" : "font-bold"
//             }`}
//             onClick={() => markAsRead(notif.id)}
//           >
//             {notif.message} <a href={notif.url}>🔗</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationDropdown;

// import React from "react";
// import useNotifications from "../context/useNotifications";

// const NotificationDropdown = ({ branch }) => {
//   const { notifications, loading, markAsRead } = useNotifications(branch);

//   if (loading) return <p className="p-4">Loading notifications...</p>;

//   return (
//     <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
//       <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
//         {notifications.length === 0 && (
//           <li className="px-4 py-2">No notifications</li>
//         )}
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//               notif.isRead ? "" : "font-bold"
//             }`}
//             onClick={() => markAsRead(notif.id)}
//           >
//             {notif.message}{" "}
//             {notif.url && (
//               <a href={notif.url} className="text-blue-500 ml-1">
//                 🔗
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationDropdown;

// import React from "react";
// import useNotifications from "../context/useNotifications";

// const NotificationDropdown = ({ branch, role }) => {
//   const { notifications, loading, markAsRead } = useNotifications(branch, role);

//   if (loading) return <p className="p-4">Loading notifications...</p>;

//   return (
//     <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
//       <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
//         {notifications.length === 0 && (
//           <li className="px-4 py-2">No notifications</li>
//         )}
//         {notifications.map((notif) => (
//           <li
//             key={notif.id}
//             className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//               notif.isRead ? "" : "font-bold"
//             }`}
//             onClick={() => markAsRead(notif.id)}
//           >
//             {notif.message}{" "}
//             {notif.url && (
//               <a href={notif.url} className="text-blue-500 ml-1">
//                 🔗
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationDropdown;

import React from "react";
import useNotifications from "../context/useNotifications";

const NotificationDropdown = ({ branch }) => {
  const { notifications, loading, markAsRead } = useNotifications(branch);

  if (loading) return <p className="p-4">Loading notifications...</p>;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
        {notifications.length === 0 && (
          <li className="px-4 py-2">No notifications</li>
        )}
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              notif.isRead ? "" : "font-bold"
            }`}
            onClick={() => markAsRead(notif.id)}
          >
            {notif.message}{" "}
            {notif.url && (
              <a href={notif.url} className="text-blue-500 ml-1">
                🔗
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
