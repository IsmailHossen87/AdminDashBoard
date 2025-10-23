import React from "react";
import { Loader2, Trash2, Eye, EyeIcon } from "lucide-react";
import {
  useAllCarQuery,
  useDeleteCarMutation,
} from "../../redux/feature/adminApi"; // Added delete mutation
import { Link, useNavigate } from "react-router-dom"; // To navigate to the car detail page
import { toast } from "react-toastify";

const Cars: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useAllCarQuery(undefined);
  const [deleteCar, { isLoading: isDeleting }] = useDeleteCarMutation();

  // Delete function
  const handleDelete = async (carId: string) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      deleteCar(carId);
      toast.success("Car deleted successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to delete car");
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Something went wrong while fetching cars.
      </div>
    );
  }

  const cars = data?.data?.result || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Cars List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-indigo-100 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">VIN</th>
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Car Type</th>
              <th className="px-4 py-2">Plate Number</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No cars found.
                </td>
              </tr>
            )}
            {cars.map((car: any, index: number) => {
              const brandTitle = car.brand?.title || "-";
              const brandImage = car.brand?.image || "/image/default-car.png";
              const model = car.model || "-";
              const year = car.year || "-";
              const vin = car.vin || "-";
              const clientName =
                car.client?.clientId?.name || car.client?.name || "-";
              const carType = car.carType || "-";

              let plateNumber = "-";
              if (carType === "International") {
                plateNumber = car.plateNumberForInternational || "-";
              } else if (carType === "Saudi") {
                plateNumber = car.plateNumberForSaudi?.numberEnglish || "-";
              }

              return (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={brandImage}
                      alt={brandTitle}
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-300"
                    />
                    <span className="font-medium text-gray-700">
                      {brandTitle}
                    </span>
                  </td>
                  <td className="px-4 py-2">{model}</td>
                  <td className="px-4 py-2">{year}</td>
                  <td className="px-4 py-2">{vin}</td>
                  <td className="px-4 py-2">{clientName}</td>
                  <td className="px-4 py-2">{carType}</td>
                  <td className="px-4 py-2">{plateNumber}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(car._id)}
                      disabled={isDeleting}
                      className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
                    >
                      <Trash2 size={16} className="mr-1" />
                    </button>

                    {/* View Details Button */}
                    <Link
                      to={`/carDetails/${car._id}`}
                      className="flex items-center ..."
                    >
                      <EyeIcon size={16} className="mr-1" /> 
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
