import { LayoutDashboard, Bell, LogOut, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import type { RootState, AppDispatch } from "../redux/store";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Notifications", icon: Bell, path: "/admin/notifications" },
    { name: "Profile", icon: User, path: "/admin/profile" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 fixed`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-indigo-400">AdminPanel</h1>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-gray-300 hover:text-white"
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
                isActive ? "bg-indigo-600" : "hover:bg-gray-700"
              }`
            }
          >
            <Icon size={20} />
            {!isCollapsed && <span className="ml-3">{name}</span>}
          </NavLink>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="admin"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        )}
        <button className="text-red-400 hover:text-red-500">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
