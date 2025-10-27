import React from "react";
import { useWorkListQuery } from "../../redux/feature/work";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

const WorkListTable: React.FC = () => {
  const { data, isLoading, isError } = useWorkListQuery(undefined);

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load work list!
      </div>
    );

  const works = data?.data?.result || [];
  console.log(works);

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🧰 Work List</h2>

        <Link to="/admin/addWork" className="mt-3 sm:mt-0">
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-all shadow-lg">
            <MdOutlineCreateNewFolder />
            Create Work
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-linear-to-tr from-blue-100 to-purple-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold border-b">
                #
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                English Title
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Bengali Title
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Category
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Type
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Code
              </th>
              <th className="py-3 px-4 text-left font-semibold border-b">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {works.map((work: any, idx: number) => (
              <tr
                key={work._id}
                className={`hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-2 px-4 border-b text-gray-700">
                  {idx + 1}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {work.title?.en || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {work.title?.bn || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {work.workCategoryName}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {work.type}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {work.code}
                </td>
                {/* <td className="py-2 px-4 border-b text-gray-700">
                  {work.providerWorkShopId
                    ? work.providerWorkShopId
                    : "—"}
                </td> */}
                <td className="py-2 px-4 border-b text-gray-500 text-sm">
                  {new Date(work.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {works.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No work found</p>
      )}
    </div>
  );
};

export default WorkListTable;
