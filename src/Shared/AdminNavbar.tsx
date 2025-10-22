import React, { useState, useEffect } from "react";
import { LayoutDashboard, Bell, LogOut, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { VscSignIn } from "react-icons/vsc";
import type { RootState } from "../redux/store";


interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Notifications", icon: Bell, path: "/admin/notifications" },
    { name: "Profile", icon: User, path: "/admin/profile" },
    { name: "CreateAdmin", icon: User, path: "/admin/createAdmin" },
    { name: "Message", icon: User, path: "/admin/message" },
    { name: "Brand", icon: User, path: "/admin/brand" },
  ];

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // If token exists, the user is logged in
  };

  useEffect(() => {
    checkLoginStatus(); 
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange); 
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); 
  };

  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-64"} bg-[#1771B7] text-white h-screen flex flex-col transition-all duration-300 fixed`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <Link to={"/"}>
            <h1 className="text-xl font-bold">AdminPanel</h1>
          </Link>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className=" hover:text-white"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 mt-4 space-y-1"
      >
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center w-full p-3 rounded-md transition-all ${
                isActive ? "bg-[#CB3C40]" : "hover:bg-gray-700"
              }`
            }
          >
            <Icon size={20} />
            {!isCollapsed && <span className="ml-3">{name}</span>}
          </NavLink>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {isLoggedIn ? (
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="admin"
                  className="h-8 w-8 rounded-full"
                />
                <div >
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
            )}
            <button
              className="text-red-400 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/signUp" className="flex px-4 rounded-xl py-2 items-center bg-amber-700 justify-between">
            <p className=" font-semibold">
              Sign Up
            </p>
            <VscSignIn size={22} className="" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
