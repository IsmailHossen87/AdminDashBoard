import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateAdminMutation } from "../redux/feature/authApi";


const CreateAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm<FieldValues>();

  const [registerUser] = useCreateAdminMutation();

const onSubmit = async (data: any) => {
  setLoading(true); 
  try {
    console.log(data);

    // Add role='ADMIN' to the data object
    const dataWithRole = { ...data, role: 'ADMIN' };
    await registerUser(dataWithRole).unwrap();

    toast.success("Registration successful!");
    reset(); 
    navigate("/"); 
  } catch (error: any) {
    setLoading(false);
    if (error?.data?.message === "Contact already exists") {
      setError("contact", {
        type: "manual",
        message: "This contact already exists.",
      });
    } else {
      toast.error("Registration failed! Please try again.");
    }
  } finally {
    setLoading(false); // Set loading to false once the process is done
  }
};


  // Watch password to compare with confirm password
  const password = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-indigo-200 via-white to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8"
      >
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-2">
          Create Admin Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Join us today — it only takes a few seconds.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              {...register("contact", { required: "Contact is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.contact.message)}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <FiEyeOff size={18} /> : <BsEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <BsEye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.confirmPassword.message)}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAdmin;
