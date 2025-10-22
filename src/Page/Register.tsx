import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router"; 
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useRegisterMutation } from "../redux/feature/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError, 
  } = useForm<FieldValues>();

  // Register mutation hook
  const [registerUser] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    setLoading(true); // Set loading to true when the user submits
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful!");
      reset(); 
      navigate("/")
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              {...register("contact", { required: "Contact is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.contact.message)}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 pr-10"
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
              <p className="text-red-500 text-xs mt-1">{String(errors.password.message)}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700  text-white rounded-lg font-semibold shadow-md transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
