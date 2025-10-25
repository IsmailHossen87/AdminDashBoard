// src/components/WorkList.tsx
import React from "react";
import { useWorkListQuery } from "../../redux/feature/work";


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
    <div className="flex">
        Work List
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
