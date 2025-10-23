import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useAllBrandQuery,
  useCreateCarModelMutation,
} from "../../redux/feature/adminApi";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

interface FormData {
  title: string;
  brand: string;
}

const CreateCarModel: React.FC = () => {
  const [createCarModel, { isLoading, isSuccess, isError }] =
    useCreateCarModelMutation();
  const { data: allBrand, isLoading: brandLoading } = useAllBrandQuery(undefined);
  const brands = allBrand?.data?.result || [];
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Submit function
  const onSubmit = async (data: FormData) => {
    try {
      await createCarModel(data).unwrap();
      console.log(data);
      toast.success("Car Model Created Successfully!");
      reset(); 
      navigate("/admin/carmodel")
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to create car model");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create New Car Model
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter car model title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Brand Dropdown */}
          <select
            {...register("brand", { required: "Brand is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={brandLoading}
          >
            <option value="">Select Brand</option>
            {brands.map((brand: any) => (
              <option key={brand._id} value={brand._id}>
                {brand.title || brand.name} {/* user-friendly name */}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={20} />}
            {isLoading ? "Creating..." : "Create Car Model"}
          </motion.button>

          {/* Feedback */}
          {isSuccess && (
            <p className="text-green-500 text-center mt-2">
              Car Model Created!
            </p>
          )}
          {isError && (
            <p className="text-red-500 text-center mt-2">
              Failed to create car model
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCarModel;
