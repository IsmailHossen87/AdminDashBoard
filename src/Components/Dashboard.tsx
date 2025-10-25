import { Loader2, Users, Calendar, DollarSign, Bookmark, Mail, Phone, User } from "lucide-react";
import { useGetDashBoardQuery } from "../redux/feature/adminApi";
import {  useGetAllAdminQuery } from "../redux/feature/authApi";



const Dashboard = () => {
  const { data: DashBoard, isLoading, isError } = useGetDashBoardQuery(undefined);
  const { data: PersonalData } = useGetAllAdminQuery(undefined);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600">
        <Loader2 className="animate-spin mr-2" size={24} />
        Loading Dashboard...
      </div>
    );
  }

  if (isError || !DashBoard?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load dashboard data ❌
      </div>
    );
  }

  const { totalAdmins, period, subscriptions } = DashBoard.data; 


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Monthly overview of platform activities and performance
        </p>
      </div>

      {/* === Dashboard Summary Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Admins */}
        <div className="bg-[#1771B7] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#0F5C79] rounded-full text-white">
            <Users size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Total Admins</p>
            <h2 className="text-2xl font-bold text-white">{totalAdmins}</h2>
          </div>
        </div>

        {/* Subscriptions Count */}
        <div className="bg-pink-500 rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-pink-700 rounded-full text-white">
            <Bookmark size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Total Subscriptions</p>
            <h2 className="text-2xl font-bold text-white">
              {subscriptions?.subscriptionsCount}
            </h2>
          </div>
        </div>

        {/* Workshops Subscribed */}
        <div className="bg-[#6F42C1] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#5A2A91] rounded-full text-white">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Workshops Subscribed</p>
            <h2 className="text-2xl font-bold text-white">
              {subscriptions?.workshopsSubscribedCount}
            </h2>
          </div>
        </div>

        {/* Amount Earned */}
        <div className="bg-[#F46236] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#D75727] rounded-full text-white">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Amount Earned</p>
            <h2 className="text-2xl font-bold text-white">
              ${subscriptions?.amountEarned}
            </h2>
          </div>
        </div>

        {/* Period Info */}
        <div className="bg-[#4C74B5] rounded-2xl shadow-lg p-6 col-span-2 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-white mb-2">
            Current Period
          </h3>
          <div className="text-sm text-white">
            <p>
              Month: <span className="font-medium">{period?.month}</span>
            </p>
            <p>
              Year: <span className="font-medium">{period?.year}</span>
            </p>
            <p>
              From:{" "}
              <span className="font-medium">
                {new Date(period?.start).toLocaleDateString()}
              </span>{" "}
              → To:{" "}
              <span className="font-medium">
                {new Date(period?.end).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* === Admin Info Section === */}
      <div className="min-h-screen py-10 px-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 ">
    All Admins
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {PersonalData?.data?.map((admin: any, index: number) => (
      <div
        key={admin._id || index}
        className="bg-linear-to-tr from-blue-500 via-purple-600 to-pink-500 p-[#1px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
            <div className="p-3 bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-md">
              <User size={26} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {admin.name}
              </h3>
              <p className="text-sm text-gray-500">
                ID: {admin._id.slice(0, 8)}...
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-gray-700 text-sm space-y-2">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-indigo-600" />
              <span className="truncate">{admin.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-green-600" />
              <span>{admin.contact}</span>
            </p>
          </div>

          {/* Footer Tag */}
          <div className="mt-3">
            <span className="inline-block text-xs font-semibold bg-linear-to-r from-blue-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-md">
              Admin
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
