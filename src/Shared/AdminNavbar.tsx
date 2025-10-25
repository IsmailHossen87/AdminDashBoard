import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  MessageCircle,
  Car,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { VscSignIn } from "react-icons/vsc";
import { MdBrandingWatermark, MdWorkHistory } from "react-icons/md";
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
    { name: "Profile", icon: User, path: "/admin/profile" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Create Admin", icon: User, path: "/admin/createAdmin" },
    { name: "Car", icon: Car, path: "/admin/car" },
    { name: "Brand", icon: MdBrandingWatermark, path: "/admin/brand" },
    { name: "Car Model", icon: Car, path: "/admin/carmodel" },
    { name: "Workshop", icon: MdWorkHistory, path: "/admin/workShop" },
    { name: "Messages", icon: MessageCircle, path: "/admin/message" },
    { name: "Setting", icon: Settings, path: "/admin/setting" },
  ];

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[#1771B7] text-white h-screen flex flex-col transition-all duration-300 fixed`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-400">
        {!isCollapsed && (
          <Link to="/">
            <h1 className="text-xl font-bold">AdminPanel</h1>
          </Link>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="hover:text-gray-100"
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
                isActive ? "bg-[#CB3C40]" : "hover:bg-blue-600"
              }`
            }
          >
            <Icon size={20} />
            {!isCollapsed && <span className="ml-3">{name}</span>}
          </NavLink>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="p-4 border-t border-blue-400">
        {isLoggedIn ? (
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="admin"
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="text-xs text-gray-200">Super Admin</p>
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
          <Link
            to="/login"
            className="flex items-center justify-between px-4 py-2 bg-green-700 rounded-xl"
          >
            <p className="font-semibold">Login</p>
            <VscSignIn size={22} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
