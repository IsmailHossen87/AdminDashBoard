import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../redux/feature/authApi";
import { toast } from "react-toastify";


const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

const [loginInfo] = useLoginMutation()


  const onSubmit = async(data: any) => {
     const res = await loginInfo(data).unwrap();
      if(res.success){
          toast.success("Logged in Successfully")
          navigate("/")
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  from-indigo-100 via-white to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Welcome Back </h2>
          <p className="text-gray-500 mt-1 text-sm">Please login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
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
                className="w-full px-4 py-2 border placeholder-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{String(errors.password.message)}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition duration-300"
          >
            <LogIn size={18} />
            Login
          </motion.button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link className="text-indigo-600 hover:underline" to={"/signUp"}>Register</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
