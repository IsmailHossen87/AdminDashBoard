import React, { useState } from "react";
import { useCreateCarBrandMutation } from "../redux/feature/adminApi"; // RTK query hook
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const CreateCarBrand: React.FC = () => {
  const [createCarBrand, { isLoading, isSuccess, isError }] = useCreateCarBrandMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !image) {
      toast.error("All fields (title, description, image) are required!");
      return;
    }

    // Creating FormData to append image and other fields
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // Wait for mutation to finish
      await createCarBrand(formData).unwrap(); // This unwraps the response to handle success/error
      toast.success("Car Brand Created Successfully!");
      setTitle(""); // Reset form
      setDescription("");
      setImage(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create car brand");
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
          Create New Car Brand
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter car brand title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Enter car brand description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit */}
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
          {isSuccess && <p className="text-green-500 text-center mt-2">Car Brand Created!</p>}
          {isError && <p className="text-red-500 text-center mt-2">Failed to create car brand</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCarBrand;
