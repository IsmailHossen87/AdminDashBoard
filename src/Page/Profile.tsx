import React from "react";
import { Loader2, User, Mail, Phone, Shield, CheckCircle } from "lucide-react";
import { useGetProfileQuery } from "../redux/feature/authApi";

const Profile: React.FC = () => {
  const { data, isLoading, isError } = useGetProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Failed to load profile data.
      </div>
    );
  }

  const profile = data.data;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-linear-to-r  from-blue-500 via-purple-500 to-pink-500 text-white  h-32"></div>

      <div className="relative px-6 pb-8 -mt-16">
        <div className="flex flex-col items-center">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-md">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}
          <h2 className="mt-4 text-2xl font-bold  text-gray-900 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500">{profile.role}</p>

          {profile.verified && (
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <CheckCircle size={16} /> Verified Account
            </div>
          )}
        </div>

       <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
  {/* Email */}
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-md">
      <Mail size={18} />
    </div>
    <span className="text-sm md:text-base">{profile.email}</span>
  </div>

  {/* Phone */}
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-md">
      <Phone size={18} />
    </div>
    <span className="text-sm md:text-base">{profile.contact}</span>
  </div>

  {/* Status */}
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md">
      <Shield size={18} />
    </div>
    <span className="text-sm md:text-base">
      Status: <span className="font-semibold capitalize">{profile.status}</span>
    </span>
  </div>

  {/* Created Date */}
  <div className="text-sm text-gray-500 mt-4">
    Created: {new Date(profile.createdAt).toLocaleDateString()}
  </div>
</div>

      </div>
    </div>
  );
};

export default Profile;
