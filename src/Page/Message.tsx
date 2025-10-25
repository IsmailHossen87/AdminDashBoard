import { motion } from "framer-motion";
import { MessageSquare, Phone, Trash2 } from "lucide-react";
import { useAllMessageQuery, useDeleteMessageMutation, } from "../redux/feature/adminApi";
import { toast } from "react-toastify";

const MessageList = () => {
  const { data: messages, isLoading, isError, refetch } = useAllMessageQuery(undefined);
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const handleDelete = async (id: string) => {

    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully!");
      refetch(); 
    } catch (error) {
      toast.error("Failed to delete message!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 font-medium">
        Loading messages...
      </div>
    );
  }

  if (isError || !messages?.data?.result?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 font-medium">
        No messages found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Messages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages?.data?.result?.map((msg: any, index: number) => (
          <motion.div
            key={msg._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-3  bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full text-white">
                  <MessageSquare size={22} />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  {msg.name || "Unknown Sender"}
                </h2>
              </div>

              <button
                onClick={() => handleDelete(msg._id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete Message"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Message Body */}
            <p className="text-gray-700 mb-3">{msg.message}</p>

            {/* Contact Info */}
            {msg.contact && (
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Phone size={16} />
                <span>{msg.contact}</span>
              </div>
            )}

            {/* Attached Data */}
            {msg.data && msg.data.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mt-2">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Attached Data:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-500">
                  {msg.data.map((item: any, i: number) => (
                    <li key={i}>{JSON.stringify(item)}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
