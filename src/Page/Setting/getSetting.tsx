import React from "react";
import { useGetSettingQuery } from "../../redux/feature/setting.Api";

const Settings: React.FC = () => {
  const { data, isLoading, isError } = useGetSettingQuery(undefined);

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

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 font-semibold">🏢 Workshop Name</p>
            <p className="text-gray-800">{setting?.workshopShopId || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">🆔 Setting ID</p>
            <p className="text-gray-800 wrap-break-word">{setting?._id}</p>
          </div>
        </div>

        {/* Privacy Policy */}
        {setting?.privacyPolicy && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Privacy Policy</h2>
            <div
              className="prose max-w-none border p-4 rounded-md bg-gray-50"
              dangerouslySetInnerHTML={{ __html: setting.privacyPolicy }}
            />
          </div>
        )}

        {/* About Us */}
        {setting?.aboutUs && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">About Us</h2>
            <div
              className="prose max-w-none border p-4 rounded-md bg-gray-50"
              dangerouslySetInnerHTML={{ __html: setting.aboutUs }}
            />
          </div>
        )}

        {/* Support */}
        {setting?.support && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Support</h2>
            <div
              className="prose max-w-none border p-4 rounded-md bg-gray-50"
              dangerouslySetInnerHTML={{ __html: setting.support }}
            />
          </div>
        )}
        {/* ternsOfService */}
        {setting?.termsOfService && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Service</h2>
            <div
              className="prose max-w-none border p-4 rounded-md bg-gray-50"
              dangerouslySetInnerHTML={{ __html: setting.termsOfService }}
            />
          </div>
        )}
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

export default Settings;
