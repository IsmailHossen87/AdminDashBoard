import React from "react";
import { useForm } from "react-hook-form";
import { useCreateSpareMutation } from "../../redux/feature/work";
import { useAllWorkShopQuery } from "../../redux/feature/adminApi";
import { toast } from "react-toastify";

type WorkFormValues = {
  title: { en: string };
  providerWorkShopId: string;
  type: "SPARE PART";
  item:string
  code: string;
  cost: number;
};

const CreateSpare: React.FC = () => {
  const { data: providers, isLoading: loadingProviders } = useAllWorkShopQuery(undefined);
  const [createSpare, { isLoading }] = useCreateSpareMutation();

  const providerList = providers?.data?.result || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkFormValues>({
    defaultValues: {
      type: "SPARE PART",
      cost: 0,
    },
  });

  const onSubmit = async (formData: WorkFormValues) => {
    try {
      const payload = {
        ...formData,
        title: { en: formData.title.en },
      };
      await createSpare(payload).unwrap();
      toast.success("Spare part created successfully!");
      reset({ type: "SPARE PART", cost: 0 });
    } catch (err) {
      toast.error("Failed to create spare part.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-10 px-4">
      <div className="w-full max-w-md  text-black rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl bg-linear-to-tr  font-bold text-center mb-6  drop-shadow-lg">
          Create Spare Part
        </h2>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <div className="space-y-1">
        <label className="text-sm font-medium">Title English</label>
        <input
          {...register("title.en", { required: "Title is required" })}
          type="text"
          placeholder="Enter title"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.title?.en && <span className="text-sm text-red-600">{errors.title.en.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Provider</label>
        {loadingProviders ? (
          <p className="text-sm text-gray-600">Loading providers...</p>
        ) : (
          <select
            {...register("providerWorkShopId", { required: "Provider is required" })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select provider
            </option>
            {providerList.length === 0 ? (
              <option value="" disabled>
                No providers found
              </option>
            ) : (
              providerList.map((p: any) => (
                <option key={p._id} value={p._id}>
                  {(p.workshopNameArabic || "").trim()} {p.workshopNameArabic && p.workshopNameEnglish ? "|" : ""}
                  {" "}
                  {(p.workshopNameEnglish || "").trim()}
                </option>
              ))
            )}
          </select>
        )}
        {errors.providerWorkShopId && <span className="text-sm text-red-600">{errors.providerWorkShopId.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Type</label>
        <input
          {...register("type")}
          type="text"
          readOnly
          value="SPARE PART"
          className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-600"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Item</label>
        <input
          {...register("item", { required: "Item is required" })}
          type="text"
          placeholder="Enter item"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.item && <span className="text-sm text-red-600">{errors.item.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Code</label>
        <input
          {...register("code", { required: "Code is required" })}
          type="text"
          placeholder="Enter code"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.code && <span className="text-sm text-red-600">{errors.code.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Cost</label>
        <input
          {...register("cost", {
            required: "Cost is required",
            valueAsNumber: true,
            min: { value: 0, message: "Cost must be 0 or more" }
          })}
          type="number"
          step="0.01"
          placeholder="Enter cost"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.cost && <span className="text-sm text-red-600">{errors.cost.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2.5 rounded-md font-medium text-white ${isLoading ? "bg-indigo-300 cursor-not-allowed" : "bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 text-white "} transition`}
      >
        {isLoading ? "Creating..." : "Create Spare"}
      </button>
    </form>
  </div>
</div>

  

  );
};

export default CreateSpare;
