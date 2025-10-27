import React, { useState } from "react";
import {
  Loader2,
  MapPin,
  Building2,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  useAllWorkShopQuery,
  useDeleteWorkShopMutation,
} from "../../redux/feature/adminApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const WorkShop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteWorkShop, { isLoading: isDeleting }] =
    useDeleteWorkShopMutation();

  const {
    data: WorkShopData,
    isLoading,
    isError,
    refetch,
  } = useAllWorkShopQuery({
    page: currentPage,
    limit: limit,
  });

  // Delete handler with confirmation
  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    try {
      const result = await Swal.fire({
        title: "Delete Workshop?",
        html: `Are you sure you want to delete <strong>${name}</strong>?<br/>This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await deleteWorkShop(id).unwrap();
        
        await Swal.fire({
          title: "Deleted!",
          text: `${name} has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Refresh the list without navigation
        refetch();
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete workshop",
        icon: "error",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600">
        <Loader2 className="animate-spin mr-2" size={24} />
        Loading Workshops...
      </div>
    );
  }

  if (isError || !WorkShopData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load workshop data ❌
      </div>
    );
  }

  const { result, meta } = WorkShopData.data;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (meta.totalPage <= maxVisible) {
      for (let i = 1; i <= meta.totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(meta.totalPage);
      } else if (currentPage >= meta.totalPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = meta.totalPage - 3; i <= meta.totalPage; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(meta.totalPage);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Workshops</h1>
          <p className="text-gray-500 text-sm">
            Total {meta.total} workshops registered on the platform
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#1771B7] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#0F5C79] rounded-full text-white">
            <Building2 size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Total Workshops</p>
            <h2 className="text-2xl font-bold text-white">{meta.total}</h2>
          </div>
        </div>

        <div className="bg-amber-800 rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-amber-900 rounded-full text-white">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Active Subscriptions</p>
            <h2 className="text-2xl font-bold text-white">
              {result.filter((w: any) => w.subscribedPackage).length}
            </h2>
          </div>
        </div>

        <div className="bg-[#6F42C1] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#5A2A91] rounded-full text-white">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Mobile Workshops</p>
            <h2 className="text-2xl font-bold text-white">
              {result.filter((w: any) => w.isAvailableMobileWorkshop).length}
            </h2>
          </div>
        </div>

        <div className="bg-[#F46236] rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-3 bg-[#D75727] rounded-full text-white">
            <CreditCard size={28} />
          </div>
          <div>
            <p className="text-white text-sm">Total Invoices</p>
            <h2 className="text-2xl font-bold text-white">
              {result.reduce(
                (sum: number, w: any) => sum + w.generatedInvoiceCount,
                0
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {result.map((workshop: any) => (
          <div
            key={workshop._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition relative"
          >
            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {/* Edit Button */}
              <Link
                to={`/UpdateWorkShop/${workshop._id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition"
                title="Edit Workshop"
              >
                <Edit size={16} />
              </Link>

              {/* Delete Button */}
              <button
                onClick={(e) =>
                  handleDelete(e, workshop._id, workshop.workshopNameEnglish)
                }
                disabled={isDeleting}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Workshop"
              >
                {isDeleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>

            {/* Card Content - Clickable for Details */}
            <Link to={`/workShopDetails/${workshop._id}`} className="block">
              {/* Header with Image */}
              <div className="flex items-start gap-4 mb-4 pr-20">
                {/* Workshop Image / Initial */}
                {workshop.image ? (
                  <img
                    src={workshop.image}
                    alt={workshop.workshopNameEnglish}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {workshop.workshopNameEnglish.charAt(0)}
                  </div>
                )}

                {/* Workshop Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {workshop.workshopNameEnglish}
                  </h3>
                  <p className="text-sm text-gray-500 arabic-text">
                    {workshop.workshopNameArabic}
                  </p>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {workshop.subscribedPackage ? (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <XCircle size={12} /> No Subscription
                      </span>
                    )}
                    {workshop.isAvailableMobileWorkshop && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Mobile
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="text-indigo-600 mt-1 flex-shrink-0"
                  />
                  <span className="line-clamp-2">{workshop.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-green-600" />
                  <span>UNN: {workshop.unn}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-purple-600" />
                  <span className="text-xs">VAT: {workshop.taxVatNumber}</span>
                </div>

                {/* Working Schedule */}
                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-indigo-600" />
                    <span className="text-xs font-semibold">
                      Regular Schedule
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {workshop.regularWorkingSchedule.startDay} -{" "}
                    {workshop.regularWorkingSchedule.endDay}
                  </p>
                  <p className="text-xs text-gray-600">
                    {workshop.regularWorkingSchedule.startTime} -{" "}
                    {workshop.regularWorkingSchedule.endTime}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Invoices</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {workshop.generatedInvoiceCount}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Trial Used</p>
                    <p className="text-lg font-bold text-purple-600">
                      {workshop.isUsedTrial ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-xs font-medium text-gray-600">
                      {new Date(workshop.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* No Data Message */}
      {result.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <Building2 size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Workshops Found
          </h3>
          <p className="text-gray-500">
            There are no workshops to display at the moment.
          </p>
        </div>
      )}

      {/* Pagination */}
      {result.length > 0 && (
        <div className="mt-10 flex justify-end">
          <div className="flex flex-col items-end gap-4 bg-white rounded-xl shadow-md p-6">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {(currentPage - 1) * limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-800">
                {Math.min(currentPage * limit, meta.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">{meta.total}</span>{" "}
              workshops
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg flex items-center gap-1 transition ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline text-sm">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={page === "..."}
                    className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-indigo-600 text-white"
                        : page === "..."
                        ? "bg-transparent text-gray-400 cursor-default"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.totalPage}
                className={`p-2 rounded-lg flex items-center gap-1 transition ${
                  currentPage === meta.totalPage
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <span className="hidden sm:inline text-sm">Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkShop;