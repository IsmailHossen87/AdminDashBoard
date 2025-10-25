import React, { useState, useEffect } from "react";
import { useGetSettingQuery, useUpdateSettingMutation,  } from "../../redux/feature/setting.Api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateSetting: React.FC = () => {
  const { data, isLoading, isError } = useGetSettingQuery(undefined);
  const [updateSetting, { isLoading: isUpdating }] = useUpdateSettingMutation();

  const setting = data?.data;

  // Local state
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [support, setSupport] = useState("");
  const [termsOfService, setTermsOfService] = useState("");
  const [accountDeletePolicy, setAccountDeletePolicy] = useState("");

  // GET data pawa por state update
  useEffect(() => {
    if (setting) {
      setPrivacyPolicy(setting.privacyPolicy || "");
      setAboutUs(setting.aboutUs || "");
      setSupport(setting.support || "");
      setTermsOfService(setting.termsOfService || "");
      setAccountDeletePolicy(setting.accountDeletePolicy || "");
    }
  }, [setting]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-600">
        Loading settings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        Failed to load settings 😢
      </div>
    );
  }

  // Update handler
  const handleUpdate = async () => {
    if (!setting?._id) return;

    try {
      await updateSetting({
        id: setting._id,
        data: {
          privacyPolicy,
          aboutUs,
          support,
          termsOfService,
          accountDeletePolicy,
        },
      }).unwrap();
      alert("Settings updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings 😢");
    }
  };

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
            <p className="text-gray-800">{setting?._id}</p>
          </div>
        </div>

        {/* Editable Sections */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Privacy Policy</h2>
          <ReactQuill value={privacyPolicy} onChange={setPrivacyPolicy} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">About Us</h2>
          <ReactQuill value={aboutUs} onChange={setAboutUs} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Support</h2>
          <ReactQuill value={support} onChange={setSupport} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Terms of Service</h2>
          <ReactQuill value={termsOfService} onChange={setTermsOfService} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Account Delete Policy</h2>
          <ReactQuill value={accountDeletePolicy} onChange={setAccountDeletePolicy} />
        </div>

        {/* Update Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSetting;
