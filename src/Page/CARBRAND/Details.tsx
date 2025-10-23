import React from "react";
import { useParams } from "react-router-dom"; 
import { useGetBrandByIdQuery } from "../../redux/feature/adminApi";

const CarBrandDetail: React.FC = () => {
  // Get the `id` from URL params
  const { id } = useParams<{ id?: string }>(); 


  if (!id) {
    return <div>No brand ID provided!</div>;
  }

  
  const { data:details, isLoading, isError } = useGetBrandByIdQuery(id);


  if (isLoading) {
    return <div>Loading...</div>;
  }
const data = details?.data 

console.log(data?.title);
  if (isError) {
    return <div>Failed to load brand details.</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Brand Details</h1>

      {/* Displaying the fetched brand data */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{data?.title}</h3>
        <p className="text-gray-600">{data?.description}</p>
      </div>
    </div>
  );
};

export default CarBrandDetail;
