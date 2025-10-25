import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useCreateWorkMutation } from "../../redux/feature/work";


interface ITitleObj {
  ar: string;
  bn: string;
  ur: string;
  hi: string;
  ti: string;
  en: string;
}

interface IFormInput {
  titleObj: ITitleObj;
  workCategoryName: string;
  code: string;
}

const CreateWorkForm: React.FC = () => {
  const [createSpare, { isLoading }] = useCreateWorkMutation();
  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      titleObj: { ar: "", bn: "", ur: "", hi: "",ti: "",en: "" },
      workCategoryName: "",
      code: "",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      await createSpare(data).unwrap();
      toast.success("Data submitted successfully!");
      reset();
    } catch (error: any) {
      toast.error("Failed to submit data.");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Spare Part
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title fields */}
        {(["ar", "bn", "ur", "hi","ti","en"] as (keyof ITitleObj)[]).map((lang) => (
          <div key={lang} className="flex flex-col">
            <label className="mb-1 font-medium">{`Title (${lang.toUpperCase()})`}</label>
            <input
              {...register(`titleObj.${lang}`)}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter title in ${lang.toUpperCase()}`}
            />
          </div>
        ))}

        {/* Work Category Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Work Category Name</label>
          <input
            {...register("workCategoryName")}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter work category"
          />
        </div>

        {/* Code */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Code</label>
          <input
            {...register("code")}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter code"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateWorkForm;
