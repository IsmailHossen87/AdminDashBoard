// src/components/WorkList.tsx
import React from "react";
import { useWorkListQuery } from "../../redux/feature/work";
import { Link } from "react-router";
import { MdOutlineCreateNewFolder } from "react-icons/md";


const colors = [
  "bg-red-100", "bg-green-100", "bg-blue-100", 
  "bg-yellow-100", "bg-pink-100", "bg-purple-100",
  "bg-orange-100", "bg-teal-100"
];

const WorkList: React.FC = () => {
  const { data, isLoading, isError } = useWorkListQuery(undefined);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching works!</div>;

  return (
   <div >
   <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-md p-5 mb-6">
  {/* Title */}
  <h2 className="text-2xl font-bold">
    🧰 Work List
  </h2>

  {/* Create Button */}
  <Link to="/admin/addWork" className="mt-4 sm:mt-0">
    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white bg-linear-to-tr from-blue-500 via-purple-600 to-pink-500 shadow-lg hover:shadow-pink-400/30 hover:scale-[1.03] transition-all duration-300">
      <MdOutlineCreateNewFolder className="text-lg" />
      <span>Create Work</span>
    </button>
  </Link>
</div>

     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.data?.result.map((work: any, idx: number) => {
        const colorClass = colors[idx % colors.length];
        return (
          <div key={work._id} className={`p-4 rounded-xl shadow-lg ${colorClass} transition transform hover:scale-105`}>
            <h2 className="font-bold text-lg mb-2">{work.workCategoryName}</h2>
            <p className="mb-1"><span className="font-semibold">Type:</span> {work.type}</p>
            <p className="mb-1"><span className="font-semibold">Code:</span> {work.code}</p>
            {work.cost && <p className="mb-1"><span className="font-semibold">Cost:</span> ${work.cost}</p>}

            <div className="mt-2 space-y-1">
              <p className="font-semibold">Titles:</p>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(work.title).map(([lang, text]: [string, any]) => {
                  if (lang !== "_id") return <li key={lang}><span className="capitalize">{lang}:</span> {text}</li>;
                  return null;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
   </div>
  );
};

export default WorkList;
