import React from "react";
import {
  useDeleteImageTypeMutation,
  useImageTypeQuery,
} from "../../redux/feature/adminApi";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCreateNewFolder, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

interface ImageItem {
  _id: string;
  image: string;
  title: string;
  type: "car_symbol" | "website_logo";
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ImageList: React.FC = () => {
  const { data, isLoading, isError } = useImageTypeQuery(undefined);
  const [deleteImage] = useDeleteImageTypeMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading images...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        Failed to load images 😢
      </div>
    );
  }

  const images: ImageItem[] = data?.data || [];

  // Count per type
  const typeCount: Record<"car_symbol" | "website_logo", number> = {
    car_symbol: 0,
    website_logo: 0,
  };

  images.forEach((img) => {
    if (img.type in typeCount) typeCount[img.type]++;
  });

  // Delete Handler
  const handleDelete = async (id: string) => {
    try {
      await deleteImage(id).unwrap();
      toast.success("Image deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-4 md:mb-0">
            Image Dashboard
          </h1>
          <Link to="/imageType">
            <button className="px-6 flex justify-between items-center gap-2 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
              Create Image Type <MdOutlineCreateNewFolder />
            </button>
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Car Symbol Card */}
          <div
            className="rounded-xl shadow-lg p-6 text-white flex flex-col justify-center items-center cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
            }}
          >
            <h3 className="text-xl font-semibold">Car Symbols</h3>
            <p className="text-4xl font-bold mt-2">{typeCount.car_symbol}</p>
          </div>

          {/* Website Logo Card */}
          <div
            className="rounded-xl shadow-lg p-6 text-white flex flex-col justify-center items-center cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #FDE68A 0%, #F97316 100%)",
            }}
          >
            <h3 className="text-xl font-semibold">Website Logos</h3>
            <p className="text-4xl font-bold mt-2">{typeCount.website_logo}</p>
          </div>
        </div>

        {/* Image List */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img: ImageItem) => (
              <div
                key={img._id}
                className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:scale-105 transition-transform duration-200 relative cursor-pointer"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                  onClick={() => navigate(`/image/${img._id}`)}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{img.title}</h3>
                  <p className="text-gray-600 text-sm">{img.description}</p>
                  <p className="text-gray-400 text-xs mt-1">Type: {img.type}</p>
                  <div className="flex gap-3 mt-3">
                    <MdEdit
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      size={20}
                      onClick={() => navigate(`/image/edit/${img._id}`)}
                    />
                    <MdDelete
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      size={20}
                      onClick={() => handleDelete(img._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageList;
