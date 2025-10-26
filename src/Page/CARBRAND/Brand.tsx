import { Delete, Loader2 } from "lucide-react"; // Loading spinner icon
import {
  useAllBrandQuery,
  useDeleteBrandMutation,
} from "../../redux/feature/adminApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const CarBrandComponent: React.FC = () => {
  const { data, isLoading, isError } = useAllBrandQuery(undefined);
  const [deleteCarBrand] = useDeleteBrandMutation();



const handleDelete = async (brandId: string) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteCarBrand(brandId).unwrap();

      Swal.fire({
        title: "Deleted!",
        text: "The car brand has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

    }
  } catch (error: any) {
    toast.error("Failed to delete car brand.");
    console.error(error);
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600">
        <Loader2 className="animate-spin mr-2" size={24} />
        Loading Brands...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load brands ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Title Section */}
      <div className="mb-8 flex justify-between items-center">
        {/* Left side - Title and Description */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Car Brands & Countries
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Discover different car brands from around the world
          </p>
        </div>

        {/* Right side - Create Car Brand Button */}
        <div>
          <Link to="/create">
            <button className="px-6 flex justify-between text-white rounded-ml items-center rounded-md gap-2 py-2 bg-linear-to-tr from-blue-500 via-purple-600 to-pink-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
              Create Car Brand <MdOutlineCreateNewFolder />
            </button>
          </Link>
        </div>
      </div>

      {/* Cards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {data?.data?.result?.map((brand: any) => (
          <motion.div
            key={brand._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={`http://10.10.7.77:8002${brand.image}`}
              alt={brand.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {brand.title}
            </h3>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(brand._id)}
              className="absolute text-2xl top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Delete />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarBrandComponent;
