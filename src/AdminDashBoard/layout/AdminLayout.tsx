import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


import AdminNavbar from "../../Shared/AdminNavbar";
import type { RootState } from "../../redux/store";

const AdminLayout: React.FC = () => {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 p-6 overflow-y-auto ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
