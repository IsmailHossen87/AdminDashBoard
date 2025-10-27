// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { Loader2 } from "lucide-react";
// import { useGetSingleWorkShopQuery, useUpdateWorkShopMutation } from "../../redux/feature/adminApi";

// interface WorkshopFormData {
//   workshopNameEnglish: string;
//   workshopNameArabic: string;
//   unn: string;
//   crn: string;
//   mln: string;
//   address: string;
//   taxVatNumber: string;
//   bankAccountNumber: string;
//   isAvailableMobileWorkshop: boolean;
//   regularStartDay: string;
//   regularEndDay: string;
//   regularStartTime: string;
//   regularEndTime: string;
//   ramadanStartDay: string;
//   ramadanEndDay: string;
//   ramadanStartTime: string;
//   ramadanEndTime: string;
//   latitude: number;
//   longitude: number;
// }

// const daysOfWeek = [
//   "Saturday",
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
// ];

// const UpdateWorkShop: React.FC = () => {
//   const { workshopId } = useParams<{ workshopId: string }>();
//   const navigate = useNavigate();

//   const { data, isLoading, isError } = useGetSingleWorkShopQuery(workshopId!);
//   const [updateWorkshop, { isLoading: isUpdating }] =
//     useUpdateWorkShopMutation();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<WorkshopFormData>();

//   // ✅ Load fetched data into form when available
//   useEffect(() => {
//     if (data?.data) {
//       const ws = data.data;
//       reset({
//         workshopNameEnglish: ws.workshopNameEnglish,
//         workshopNameArabic: ws.workshopNameArabic,
//         unn: ws.unn,
//         crn: ws.crn,
//         mln: ws.mln,
//         address: ws.address,
//         taxVatNumber: ws.taxVatNumber,
//         bankAccountNumber: ws.bankAccountNumber,
//         isAvailableMobileWorkshop: ws.isAvailableMobileWorkshop,
//         regularStartDay: ws.regularWorkingSchedule?.startDay,
//         regularEndDay: ws.regularWorkingSchedule?.endDay,
//         regularStartTime: ws.regularWorkingSchedule?.startTime,
//         regularEndTime: ws.regularWorkingSchedule?.endTime,
//         ramadanStartDay: ws.ramadanWorkingSchedule?.startDay,
//         ramadanEndDay: ws.ramadanWorkingSchedule?.endDay,
//         ramadanStartTime: ws.ramadanWorkingSchedule?.startTime,
//         ramadanEndTime: ws.ramadanWorkingSchedule?.endTime,
//         latitude: ws.workshopGEOlocation?.coordinates?.[1],
//         longitude: ws.workshopGEOlocation?.coordinates?.[0],
//       });
//     }
//   }, [data, reset]);

//   const onSubmit = async (formData: WorkshopFormData) => {
//     const payload = {
//       workshopNameEnglish: formData.workshopNameEnglish,
//       workshopNameArabic: formData.workshopNameArabic,
//       unn: formData.unn,
//       crn: formData.crn,
//       mln: formData.mln,
//       address: formData.address,
//       taxVatNumber: formData.taxVatNumber,
//       bankAccountNumber: formData.bankAccountNumber,
//       isAvailableMobileWorkshop: formData.isAvailableMobileWorkshop,
//       regularWorkingSchedule: {
//         startDay: formData.regularStartDay,
//         endDay: formData.regularEndDay,
//         startTime: formData.regularStartTime,
//         endTime: formData.regularEndTime,
//       },
//       ramadanWorkingSchedule: {
//         startDay: formData.ramadanStartDay,
//         endDay: formData.ramadanEndDay,
//         startTime: formData.ramadanStartTime,
//         endTime: formData.ramadanEndTime,
//       },
//       workshopGEOlocation: {
//         type: "Point",
//         coordinates: [formData.longitude, formData.latitude],
//       },
//     };

//     try {
//       await updateWorkshop({ id: workshopId!, payload }).unwrap();
//       toast.success("✅ Workshop updated successfully!");
//       navigate(`/workshopDetails/${workshopId}`);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "❌ Update failed");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-indigo-600">
//         <Loader2 className="animate-spin mr-2" size={24} />
//         Loading workshop data...
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="text-center text-red-500 mt-10">
//         Failed to fetch workshop details ❌
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl"
//       >
//         <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
//           Update Workshop
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Workshop Name */}
//           <div>
//             <label className="font-semibold text-gray-700">
//               Workshop Name (English)
//             </label>
//             <input
//               {...register("workshopNameEnglish", { required: true })}
//               className="w-full border rounded-lg px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-gray-700">
//               Workshop Name (Arabic)
//             </label>
//             <input
//               {...register("workshopNameArabic", { required: true })}
//               className="w-full border rounded-lg px-3 py-2"
//             />
//           </div>

//           {/* Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input {...register("unn", { required: true })} placeholder="UNN" className="border rounded-lg px-3 py-2" />
//             <input {...register("crn", { required: true })} placeholder="CRN" className="border rounded-lg px-3 py-2" />
//             <input {...register("mln", { required: true })} placeholder="MLN" className="border rounded-lg px-3 py-2" />
//           </div>

//           {/* Address */}
//           <input {...register("address", { required: true })} placeholder="Address" className="w-full border rounded-lg px-3 py-2" />

//           {/* Tax & Bank */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input {...register("taxVatNumber", { required: true })} placeholder="Tax/VAT Number" className="border rounded-lg px-3 py-2" />
//             <input {...register("bankAccountNumber", { required: true })} placeholder="Bank Account Number" className="border rounded-lg px-3 py-2" />
//           </div>

//           {/* Mobile Workshop */}
//           <div className="flex gap-2 items-center">
//             <input type="checkbox" {...register("isAvailableMobileWorkshop")} />
//             <label>Mobile Workshop Available</label>
//           </div>

//           {/* Geo Location */}
//           <div className="grid grid-cols-2 gap-3">
//             <input type="number" step="any" {...register("latitude", { required: true })} placeholder="Latitude" className="border rounded-lg px-3 py-2" />
//             <input type="number" step="any" {...register("longitude", { required: true })} placeholder="Longitude" className="border rounded-lg px-3 py-2" />
//           </div>

//           {/* Regular Schedule */}
//           <h3 className="text-indigo-700 font-semibold mt-4">Regular Schedule</h3>
//           <div className="grid grid-cols-2 gap-3">
//             <select {...register("regularStartDay")} className="border rounded-lg px-3 py-2">
//               {daysOfWeek.map((day) => (
//                 <option key={day}>{day}</option>
//               ))}
//             </select>
//             <select {...register("regularEndDay")} className="border rounded-lg px-3 py-2">
//               {daysOfWeek.map((day) => (
//                 <option key={day}>{day}</option>
//               ))}
//             </select>
//             <input type="time" {...register("regularStartTime")} className="border rounded-lg px-3 py-2" />
//             <input type="time" {...register("regularEndTime")} className="border rounded-lg px-3 py-2" />
//           </div>

//           {/* Ramadan Schedule */}
//           <h3 className="text-indigo-700 font-semibold mt-4">Ramadan Schedule</h3>
//           <div className="grid grid-cols-2 gap-3">
//             <select {...register("ramadanStartDay")} className="border rounded-lg px-3 py-2">
//               {daysOfWeek.map((day) => (
//                 <option key={day}>{day}</option>
//               ))}
//             </select>
//             <select {...register("ramadanEndDay")} className="border rounded-lg px-3 py-2">
//               {daysOfWeek.map((day) => (
//                 <option key={day}>{day}</option>
//               ))}
//             </select>
//             <input type="time" {...register("ramadanStartTime")} className="border rounded-lg px-3 py-2" />
//             <input type="time" {...register("ramadanEndTime")} className="border rounded-lg px-3 py-2" />
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={isUpdating}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 font-semibold flex justify-center items-center gap-2"
//           >
//             {isUpdating && <Loader2 size={18} className="animate-spin" />}
//             {isUpdating ? "Updating..." : "Update Workshop"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UpdateWorkShop;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useGetSingleWorkShopQuery, useUpdateWorkShopMutation } from "../../redux/feature/adminApi";

interface WorkshopFormData {
  workshopNameEnglish: string;
  workshopNameArabic: string;
  unn: string;
  crn: string;
  mln: string;
  address: string;
  taxVatNumber: string;
  bankAccountNumber: string;
  isAvailableMobileWorkshop: boolean;
  regularStartDay: string;
  regularEndDay: string;
  regularStartTime: string;
  regularEndTime: string;
  ramadanStartDay: string;
  ramadanEndDay: string;
  ramadanStartTime: string;
  ramadanEndTime: string;
  latitude: number;
  longitude: number;
  image?: FileList;
}

const daysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const UpdateWorkShop: React.FC = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>("");

  const { data, isLoading, isError } = useGetSingleWorkShopQuery(workshopId!);
  const [updateWorkshop, { isLoading: isUpdating }] = useUpdateWorkShopMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkshopFormData>();

  // Get user role from your auth system
  useEffect(() => {
    // Replace with your actual auth logic
    const role = localStorage.getItem("userRole") || "owner"; 
    setUserRole(role);
  }, []);

  // Load fetched data into form
  useEffect(() => {
    if (data?.data) {
      const ws = data.data;
      reset({
        workshopNameEnglish: ws.workshopNameEnglish || "",
        workshopNameArabic: ws.workshopNameArabic || "",
        unn: ws.unn || "",
        crn: ws.crn || "",
        mln: ws.mln || "",
        address: ws.address || "",
        taxVatNumber: ws.taxVatNumber || "",
        bankAccountNumber: ws.bankAccountNumber || "",
        isAvailableMobileWorkshop: ws.isAvailableMobileWorkshop || false,
        regularStartDay: ws.regularWorkingSchedule?.startDay || "Saturday",
        regularEndDay: ws.regularWorkingSchedule?.endDay || "Friday",
        regularStartTime: ws.regularWorkingSchedule?.startTime || "",
        regularEndTime: ws.regularWorkingSchedule?.endTime || "",
        ramadanStartDay: ws.ramadanWorkingSchedule?.startDay || "Saturday",
        ramadanEndDay: ws.ramadanWorkingSchedule?.endDay || "Thursday",
        ramadanStartTime: ws.ramadanWorkingSchedule?.startTime || "",
        ramadanEndTime: ws.ramadanWorkingSchedule?.endTime || "",
        latitude: ws.workshopGEOlocation?.coordinates?.[1] || 0,
        longitude: ws.workshopGEOlocation?.coordinates?.[0] || 0,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: WorkshopFormData) => {
    const formDataToSend = new FormData();

    // Build data object based on user role
    let dataObject: any;

    if (userRole === "admin") {
      // Admin can update all fields
      dataObject = {
        workshopNameEnglish: formData.workshopNameEnglish,
        workshopNameArabic: formData.workshopNameArabic,
        unn: formData.unn,
        crn: formData.crn,
        mln: formData.mln,
        address: formData.address,
        taxVatNumber: formData.taxVatNumber,
        bankAccountNumber: formData.bankAccountNumber,
        isAvailableMobileWorkshop: formData.isAvailableMobileWorkshop,
        regularWorkingSchedule: {
          startDay: formData.regularStartDay,
          endDay: formData.regularEndDay,
          startTime: formData.regularStartTime,
          endTime: formData.regularEndTime,
        },
        ramadanWorkingSchedule: {
          startDay: formData.ramadanStartDay,
          endDay: formData.ramadanEndDay,
          startTime: formData.ramadanStartTime,
          endTime: formData.ramadanEndTime,
        },
        workshopGEOlocation: {
          type: "Point",
          coordinates: [formData.longitude, formData.latitude],
        },
      };
    } else {
      // Owner can only update limited fields
      dataObject = {
        workshopNameEnglish: formData.workshopNameEnglish,
        workshopNameArabic: formData.workshopNameArabic,
        address: formData.address,
        isAvailableMobileWorkshop: formData.isAvailableMobileWorkshop,
        regularWorkingSchedule: {
          startDay: formData.regularStartDay,
          endDay: formData.regularEndDay,
          startTime: formData.regularStartTime,
          endTime: formData.regularEndTime,
        },
        ramadanWorkingSchedule: {
          startDay: formData.ramadanStartDay,
          endDay: formData.ramadanEndDay,
          startTime: formData.ramadanStartTime,
          endTime: formData.ramadanEndTime,
        },
      };
    }

    // Append data as JSON string
    formDataToSend.append("data", JSON.stringify(dataObject));

    // Append image if provided (admin only)
    if (userRole === "admin" && formData.image && formData.image.length > 0) {
      formDataToSend.append("image", formData.image[0]);
    }

    try {
      await updateWorkshop({ id: workshopId!, payload: formDataToSend }).unwrap();
      toast.success("✅ Workshop updated successfully!");
      navigate(`/admin/workShop`);
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Update failed");
      console.error("Update error:", error);
    }
  };

  // Check if field is editable based on role
  const isFieldEditable = (field: string): boolean => {
    if (userRole === "admin") return true;
    
    const ownerEditableFields = [
      "workshopNameEnglish",
      "workshopNameArabic",
      "address",
      "isAvailableMobileWorkshop",
      "regularStartDay",
      "regularEndDay",
      "regularStartTime",
      "regularEndTime",
      "ramadanStartDay",
      "ramadanEndDay",
      "ramadanStartTime",
      "ramadanEndTime",
    ];
    
    return ownerEditableFields.includes(field);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600">
        <Loader2 className="animate-spin mr-2" size={24} />
        Loading workshop data...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to fetch workshop details ❌
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Update Workshop {userRole === "owner" && "(Owner View)"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Workshop Name */}
          <div>
            <label className="font-semibold text-gray-700">
              Workshop Name (English) *
            </label>
            <input
              {...register("workshopNameEnglish", { required: true })}
              disabled={!isFieldEditable("workshopNameEnglish")}
              className={`w-full border rounded-lg px-3 py-2 ${
                !isFieldEditable("workshopNameEnglish") ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
            {errors.workshopNameEnglish && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Workshop Name (Arabic) *
            </label>
            <input
              {...register("workshopNameArabic", { required: true })}
              disabled={!isFieldEditable("workshopNameArabic")}
              className={`w-full border rounded-lg px-3 py-2 ${
                !isFieldEditable("workshopNameArabic") ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
            {errors.workshopNameArabic && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Basic Info - Admin Only */}
          {userRole === "admin" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <input
                    {...register("unn", { required: true })}
                    placeholder="UNN *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.unn && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("crn", { required: true })}
                    placeholder="CRN *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.crn && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("mln", { required: true })}
                    placeholder="MLN *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.mln && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
              </div>

              {/* Tax & Bank */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    {...register("taxVatNumber", { required: true })}
                    placeholder="Tax/VAT Number *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.taxVatNumber && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("bankAccountNumber", { required: true })}
                    placeholder="Bank Account Number *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.bankAccountNumber && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Address */}
          <div>
            <label className="font-semibold text-gray-700">Address *</label>
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>

          {/* Mobile Workshop */}
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              {...register("isAvailableMobileWorkshop")}
              id="mobileWorkshop"
            />
            <label htmlFor="mobileWorkshop">Mobile Workshop Available</label>
          </div>

          {/* Geo Location - Admin Only */}
          {userRole === "admin" && (
            <>
              <h3 className="text-indigo-700 font-semibold mt-4">GEO Location</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    step="any"
                    {...register("latitude", { required: true })}
                    placeholder="Latitude *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.latitude && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    {...register("longitude", { required: true })}
                    placeholder="Longitude *"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  {errors.longitude && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="font-semibold text-gray-700">
                  Workshop Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </>
          )}

          {/* Regular Schedule */}
          <h3 className="text-indigo-700 font-semibold mt-4">Regular Schedule</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Start Day</label>
              <select
                {...register("regularStartDay")}
                className="w-full border rounded-lg px-3 py-2"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">End Day</label>
              <select
                {...register("regularEndDay")}
                className="w-full border rounded-lg px-3 py-2"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Start Time</label>
              <input
                type="time"
                {...register("regularStartTime")}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">End Time</label>
              <input
                type="time"
                {...register("regularEndTime")}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Ramadan Schedule */}
          <h3 className="text-indigo-700 font-semibold mt-4">Ramadan Schedule</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Start Day</label>
              <select
                {...register("ramadanStartDay")}
                className="w-full border rounded-lg px-3 py-2"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">End Day</label>
              <select
                {...register("ramadanEndDay")}
                className="w-full border rounded-lg px-3 py-2"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Start Time</label>
              <input
                type="time"
                {...register("ramadanStartTime")}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">End Time</label>
              <input
                type="time"
                {...register("ramadanEndTime")}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isUpdating}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 font-semibold flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
          >
            {isUpdating && <Loader2 size={18} className="animate-spin" />}
            {isUpdating ? "Updating..." : "Update Workshop"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateWorkShop;