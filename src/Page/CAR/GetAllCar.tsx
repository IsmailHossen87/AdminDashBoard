import React from "react";
import { Loader2, Trash2, Eye } from "lucide-react";
import {
  useAllCarQuery,
  useDeleteCarMutation,
} from "../../redux/feature/adminApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type MaybeObjWithTitle = { title?: string } | string | undefined | null;
type MaybeImage = string | { url?: string } | undefined | null;

const toTitle = (v: MaybeObjWithTitle, fallback = "-") =>
  v && typeof v === "object" ? v.title || fallback : v || fallback;

const toImageUrl = (v: MaybeImage, fallback = "/image/default-car.png") =>
  !v ? fallback : typeof v === "string" ? v : v.url || fallback;

const Cars: React.FC = () => {
  const { data, isLoading, isError } = useAllCarQuery(undefined);
  const [deleteCar, { isLoading: isDeleting }] = useDeleteCarMutation();

  const handleDelete = async (carId: string) => {
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
        await deleteCar(carId).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error: any) {
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

  const cars = data?.data?.result || data?.result || [];

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
              const brandTitle = toTitle(car.brand);
              const brandImage = toImageUrl(
                car.brand?.image ?? car.brand?.logo ?? car.brand?.img
              );
              const modelTitle = toTitle(car.model);
              const year = String(car.year || "-");
              const vin = car.vin || "-";
              const clientName =
                toTitle(car.client?.clientId) || car.client?.name || "-";
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

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={brandImage}
                        alt={brandTitle}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-300"
                      />
                      <span className="font-medium text-gray-700">
                        {brandTitle}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-2">{modelTitle}</td>
                  <td className="px-4 py-2">{year}</td>
                  <td className="px-4 py-2">{vin}</td>
                  <td className="px-4 py-2">{clientName}</td>
                  <td className="px-4 py-2">{carType}</td>
                  <td className="px-4 py-2">{plateNumber}</td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(car._id)}
                        disabled={isDeleting}
                        className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition disabled:opacity-60"
                        title="Delete"
                      >
                        {isDeleting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>

                      <Link
                        to={`/carDetails/${car._id}`}
                        className="flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
                        title="View details"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
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
