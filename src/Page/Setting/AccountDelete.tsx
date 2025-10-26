import React from "react";
import { useGetAllSettingQuery } from "../../redux/feature/setting.Api";


const AccountDelete: React.FC = () => {
  const { data, isLoading, isError } = useGetAllSettingQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-600">
        Loading settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center text-5xl items-center min-h-screen text-red-500 font-semibold">
        Failed to load settings 😢
      </div>
    );
  }

  const setting = data?.data;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Application Settings
        </h1>



        {/* DeletePolicy */}
        {setting?.accountDeletePolicy && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Account Delete Policy</h2>
            <div
              className="prose max-w-none border p-4 rounded-md bg-gray-50"
              dangerouslySetInnerHTML={{ __html: setting.accountDeletePolicy }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDelete;