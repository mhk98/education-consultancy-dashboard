// import React, { useContext, useState } from 'react'
// import { SidebarContext } from '../context/SidebarContext'
// import {
//   SearchIcon,
//   MoonIcon,
//   SunIcon,
//   BellIcon,
//   MenuIcon,
//   OutlinePersonIcon,
//   OutlineCogIcon,
//   OutlineLogoutIcon,
// } from '../icons'
// import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'

// function Header() {
//   const { mode, toggleMode } = useContext(WindmillContext)
//   const { toggleSidebar } = useContext(SidebarContext)

//   const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

//   function handleNotificationsClick() {
//     setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
//   }

//   function handleProfileClick() {
//     setIsProfileMenuOpen(!isProfileMenuOpen)
//   }

//   return (
//     <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
//       <div className="container flex items-center justify-between h-full px-6 mx-auto text-brandRed dark:text-brandRed">
//         {/* <!-- Mobile hamburger --> */}
//         <button
//           className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-brandRed"
//           onClick={toggleSidebar}
//           aria-label="Menu"
//         >
//           <MenuIcon className="w-6 h-6" aria-hidden="true" />
//         </button>
//         {/* <!-- Search input --> */}
//         <div className="flex justify-center flex-1 lg:mr-32">
//           <div className="relative w-full max-w-xl mr-6 focus-within:text-brandRed">
//             <div className="absolute inset-y-0 flex items-center pl-2">
//               <SearchIcon className="w-4 h-4" aria-hidden="true" />
//             </div>
//             <Input
//               className="pl-8 text-gray-700"
//               placeholder="Search for projects"
//               aria-label="Search"
//             />
//           </div>
//         </div>
//         <ul className="flex items-center flex-shrink-0 space-x-6">
//           {/* <!-- Theme toggler --> */}
//           <li className="flex">
//             <button
//               className="rounded-md focus:outline-none focus:shadow-outline-brandRed"
//               onClick={toggleMode}
//               aria-label="Toggle color mode"
//             >
//               {mode === 'dark' ? (
//                 <SunIcon className="w-5 h-5" aria-hidden="true" />
//               ) : (
//                 <MoonIcon className="w-5 h-5" aria-hidden="true" />
//               )}
//             </button>
//           </li>
//           {/* <!-- Notifications menu --> */}
//           <li className="relative">
//             <button
//               className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-brandRed"
//               onClick={handleNotificationsClick}
//               aria-label="Notifications"
//               aria-haspopup="true"
//             >
//               <BellIcon className="w-5 h-5" aria-hidden="true" />
//               {/* <!-- Notification badge --> */}
//               <span
//                 aria-hidden="true"
//                 className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
//               ></span>
//             </button>

//             <Dropdown
//               align="right"
//               isOpen={isNotificationsMenuOpen}
//               onClose={() => setIsNotificationsMenuOpen(false)}
//             >
//               <DropdownItem tag="a" href="#" className="justify-between">
//                 <span>Messages</span>
//                 <Badge type="danger">13</Badge>
//               </DropdownItem>
//               <DropdownItem tag="a" href="#" className="justify-between">
//                 <span>Sales</span>
//                 <Badge type="danger">2</Badge>
//               </DropdownItem>
//               <DropdownItem onClick={() => alert('Alerts!')}>
//                 <span>Alerts</span>
//               </DropdownItem>
//             </Dropdown>
//           </li>
//           {/* <!-- Profile menu --> */}
//           <li className="relative">
//             <button
//               className="rounded-full focus:shadow-outline-brandRed focus:outline-none"
//               onClick={handleProfileClick}
//               aria-label="Account"
//               aria-haspopup="true"
//             >
//               <Avatar
//                 className="align-middle"
//                 src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
//                 alt=""
//                 aria-hidden="true"
//               />
//             </button>
//             <Dropdown
//               align="right"
//               isOpen={isProfileMenuOpen}
//               onClose={() => setIsProfileMenuOpen(false)}
//             >
//               <DropdownItem tag="a" href="#">
//                 <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
//                 <span>Profile</span>
//               </DropdownItem>
//               <DropdownItem tag="a" href="#">
//                 <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
//                 <span>Settings</span>
//               </DropdownItem>
//               <DropdownItem onClick={() => alert('Log out!')}>
//                 <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
//                 <span>Log out</span>
//               </DropdownItem>
//             </Dropdown>
//           </li>
//         </ul>
//       </div>
//     </header>
//   )
// }

// export default Header



import { Input, WindmillContext } from '@windmill/react-ui'
import { BellIcon, MenuIcon, MoonIcon, SearchIcon } from '../icons'
import React, { useContext, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
export default function Header() {
  const { mode, toggleMode } = React.useContext(WindmillContext)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const history = useHistory()
  // Toggle notification dropdown
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen)

  // Toggle profile dropdown
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const { toggleSidebar } = useContext(SidebarContext)

 const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login")
  };


  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      {/* Logo or Brand */}
      {/* <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">Windmill</h1> */}
     {/* <!-- Mobile hamburger --> */}
         <button
           className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-brandRed"
          onClick={toggleSidebar}
           aria-label="Menu"
         >
           <MenuIcon className="w-6 h-6" aria-hidden="true" />
         </button>
      {/* Search Input */}
      <div className="flex justify-center flex-1 lg:mr-32">
           <div className="relative w-full max-w-xl mr-6 focus-within:text-brandRed">
             <div className="absolute inset-y-0 flex items-center pl-2">
               <SearchIcon className="w-4 h-4" aria-hidden="true" />
             </div>
             <Input
               className="pl-8 text-gray-700"
               placeholder="Search for projects"
               aria-label="Search"
             />
           </div>
         </div>

      {/* Icons and Avatar */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleMode} className="text-brandRed focus:outline-none">
          <MoonIcon className="w-5 h-5" />
        </button>
        
        {/* Notification Icon with Dropdown */}
        <div className="relative">
          <button onClick={toggleNotification} className="text-brandRed focus:outline-none">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">New comment on your post</li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Someone liked your project</li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">You have a new follower</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button onClick={toggleProfile} className="text-brandRed focus:outline-none">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://i.pravatar.cc/300"
              alt="User avatar"
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <ul className="py-2 text-sm text-gray-800 dark:text-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Settings</li>
                <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
