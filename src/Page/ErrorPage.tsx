import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-linear-to-tr from-blue-500 via-purple-600 to-pink-500 text-white rounded-lg shadow-md hover:scale-[1.03] transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
