// import React from "react";
// import { useForm } from "react-hook-form";
// import { useCreateCarBrandMutation } from "../../redux/feature/adminApi";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router";

// interface FormData {
//   title: string;
//   description: string;
//   image: FileList;
//   type: string;
// }

// const CreateCarBrand: React.FC = () => {
//   const [createCarBrand, { isLoading, isSuccess, isError }] =
//     useCreateCarBrandMutation();
//     const navigate = useNavigate()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>();

//   const onSubmit = async (data: FormData) => {
//     if (!data.image || data.image.length === 0) {
//       toast.error("Image is required!");
//       return;
//     }

//     const formData = new FormData();

//     const dataObject = {
//       title: data.title,
//       description: data.description,
//       type: data.type,
//     };

//     formData.append("data", JSON.stringify(dataObject));
//     formData.append("image", data.image[0]);

//     try {
//       await createCarBrand(formData).unwrap();
//       toast.success("Car Brand Created Successfully!");
//       reset();
//       navigate("/admin/brand")
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to create car brand");
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100 flex justify-center items-start">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
//       >
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
//           Create New Car Brand
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               placeholder="Enter car brand title"
//               {...register("title", { required: "Title is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-xs">{errors.title.message}</p>
//             )}
//           </div>

//           {/* Type */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Type
//             </label>
//             <select
//               {...register("type", { required: "Type is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">Select Type</option>
//               <option value="car_symbol">Car Symbol</option>
//               <option value="website_logo">Website Logo</option>
//             </select>
//             {errors.type && (
//               <p className="text-red-500 text-xs">{errors.type.message}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               placeholder="Enter car brand description"
//               {...register("description", { required: "Description is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-xs">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               {...register("image", { required: "Image is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.image && (
//               <p className="text-red-500 text-xs">{errors.image.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
//           >
//             {isLoading && <Loader2 className="animate-spin" size={20} />}
//             {isLoading ? "Creating..." : "Create Car Brand"}
//           </motion.button>

//           {/* Success or Error Feedback */}
//           {isSuccess && (
//             <p className="text-green-500 text-center mt-2">Car Brand Created!</p>
//           )}
//           {isError && (
//             <p className="text-red-500 text-center mt-2">
//               Failed to create car brand
//             </p>
//           )}
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default CreateCarBrand;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import {
  useAllBrandQuery,
  useAllCountryQuery,
  useCreateCarBrandMutation,
} from "../../redux/feature/adminApi";

interface FormData {
  title: string;
  country: string;
  description: string;
  image: FileList;
}

const CreateCarBrand: React.FC = () => {
  const [createCarBrand, { isLoading, isSuccess, isError }] =
    useCreateCarBrandMutation();
  const navigate = useNavigate();

  const { data: countryData, isLoading: isCountryLoading } =
    useAllCountryQuery(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Image is required!");
      return;
    }

    const formData = new FormData();

    const dataObject = {
      title: data.title,
      country: data.country,
      description: data.description,
    };

    formData.append("data", JSON.stringify(dataObject));
    formData.append("image", data.image[0]);

    try {
      await createCarBrand(formData).unwrap();
      toast.success("Car Brand Created Successfully!");
      reset();
      navigate("/admin/brand");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create car brand");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Create New Car Brand
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter car brand title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Country
            </label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setSelectedCountry(e.target.value)}
              value={selectedCountry || ""}
            >
              <option value="">Select Country</option>
              {countryData?.data?.map((country: any) => (
                <option key={country._id} value={country._id}>
                  {country.title}
                </option>
              ))}
            </select>

            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter car brand description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={20} />}
            {isLoading ? "Creating..." : "Create Car Brand"}
          </motion.button>

          {/* Success or Error Feedback */}
          {isSuccess && (
            <p className="text-green-500 text-center mt-2">
              Car Brand Created!
            </p>
          )}
          {isError && (
            <p className="text-red-500 text-center mt-2">
              Failed to create car brand
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCarBrand;
