import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  MessageCircle,
  Car,
  Settings,
  Sparkle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { VscSignIn } from "react-icons/vsc";
import { MdBrandingWatermark, MdWork, MdWorkHistory } from "react-icons/md";
import type { RootState } from "../redux/store";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ElementType;
  subItems?: { name: string; path: string }[];
}

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Profile", icon: User, path: "/admin/profile" },
  { name: "Car", icon: Car, path: "/admin/car" },
  { name: "Brand", icon: MdBrandingWatermark, path: "/admin/brand" },
  { name: "Car Model", icon: Car, path: "/admin/carmodel" },
  { name: "Workshop", icon: MdWorkHistory, path: "/admin/workShop" },
  { name: "Work", icon: MdWork, path: "/admin/workList" },
  { name: "Spare", icon: Sparkle, path: "/admin/Spare" },
  { name: "Messages", icon: MessageCircle, path: "/admin/message" },
  {
    name: "Setting",
    icon: Settings,
    subItems: [
      { name: "Privacy Policy", path: "/admin/privacy-policy" },
      { name: "About Us", path: "/admin/about-us" },
      { name: "Support", path: "/admin/support" },
      { name: "Service", path: "/admin/service" },
      { name: "Account Delete", path: "/admin/account-delete" },
    ],
  },
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
        className="flex-1 mt-4 space-y-1 overflow-y-auto"
      >
        {menuItems.map(({ name, icon: Icon, path, subItems }) => (
          <div key={name}>
            {subItems ? (
              <>
                {/* Dropdown Parent */}
                <button
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className={`flex items-center justify-between  w-full p-3 rounded-md transition-all ${
                    openDropdown
                      ? "bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 text-white font-bold"
                      : "hover:bg-pink-500"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon size={20} />
                    {!isCollapsed && <span className="ml-3">{name}</span>}
                  </div>
                  {!isCollapsed &&
                    (openDropdown ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    ))}
                </button>

                {/* Dropdown Items */}
                {openDropdown && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="ml-10 mt-1 space-y-1"
                  >
                    {subItems.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block text-sm p-2 rounded-md transition-all ${
                            isActive
                              ? "bg-blue-600 font-semibold"
                              : "hover:bg-blue-500"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              // Normal menu item
              <NavLink
                to={path!}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 rounded-md transition-all ${
                    isActive
                      ? "bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 font-bold text-white"
                      : "hover:bg-pink-500"
                  }`
                }
              >
                <Icon size={20} />
                {!isCollapsed && <span className="ml-3">{name}</span>}
              </NavLink>
            )}
          </div>
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
