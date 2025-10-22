
import { LayoutDashboard, Bell, LogOut, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router";
import { VscSignIn } from "react-icons/vsc";

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
      className={`${isCollapsed ? "w-20" : "w-64"} bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 fixed`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
         <Link to={"/"}>
         
          <h1 className="text-xl font-bold text-indigo-400">AdminPanel</h1></Link>
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
      <div className="p-4  border-t border-gray-700 flex gap-7 items-center ">
     <Link to={"/signUp"}>Sign Up  </Link>
      <VscSignIn />
       </div>
    </div>
  );
};

export default AdminNavbar;
