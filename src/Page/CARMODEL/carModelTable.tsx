import { Link } from "react-router-dom";
import {
  useAllCarModelQuery,
  useDeletecarModelMutation,
} from "../../redux/feature/adminApi";
import { FiDelete, FiEdit } from "react-icons/fi";
import { Button, Tooltip } from "antd";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { toast } from "react-toastify";
import ImageList from "../IMAGE/ImageList";

interface CarModel {
  _id: string;
  brand: string;
  title: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CarModelTable = () => {
  const { data, error, isLoading } = useAllCarModelQuery(undefined);
  const [deleteCarBrand] = useDeletecarModelMutation();

  const handleDelete = (id: string) => {
    deleteCarBrand(id);
    toast.success("Successfully Delete the model");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-lg font-medium text-gray-600">
        Loading car models...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-medium mt-6">
        Failed to load car models. Please try again later.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white/60 backdrop-blur-lg border border-gray-100 shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            🚗 Car Models Management
          </h2>

          <Link to="/model">
            <button className="px-6 flex justify-between items-center gap-2 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
              Create Car Model <MdOutlineCreateNewFolder />
            </button>
          </Link>
        </div>

        {data?.data?.length === 0 ? (
          <div className="text-center text-gray-500 font-medium py-8">
            No car models found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className=" from-indigo-100 to-indigo-200 text-gray-700 uppercase text-xs md:text-sm font-semibold tracking-wide">
                  <th className="px-5 py-3 text-left rounded-tl-lg">Title</th>
                  <th className="px-5 py-3 text-left">Brand</th>
                  <th className="px-5 py-3 text-left">Created At</th>
                  <th className="px-5 py-3 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((carModel: CarModel, index: number) => (
                  <tr
                    key={carModel._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50 transition duration-200`}
                  >
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {carModel.title}
                    </td>
                    <td className="px-5 py-3 text-gray-700">
                      {carModel.brand}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(carModel.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 flex justify-center gap-3">
                      <Tooltip title="Edit Model">
                        <Link to={`/edit/${carModel._id}`}>
                          <Button
                            icon={<FiEdit />}
                            type="primary"
                            shape="circle"
                            className="bg-indigo-500 hover:bg-indigo-600"
                          />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete Model">
                        <Button
                          danger
                          icon={<FiDelete />}
                          shape="circle"
                          onClick={() => handleDelete(carModel._id)}
                          className="hover:scale-110 transition"
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* IMAGE TYPE */}
     <div>
      <ImageList/>
     </div>
    </div>
  );
};

export default CarModelTable;
