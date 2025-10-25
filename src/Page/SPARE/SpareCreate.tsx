// src/components/CreateWork.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateSpareMutation } from "../../redux/feature/work";
import { useAllWorkShopQuery } from "../../redux/feature/adminApi";


type WorkFormValues = {
  title: string;
  providerWorkShopId: string;
  type: string;
  code: string;
  cost: number;
};

const CreateSpare: React.FC = () => {
  const { data: providers, isLoading: loadingProviders } = useAllWorkShopQuery(undefined);
  const [createSpare, { isLoading }] = useCreateSpareMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkFormValues>({
    defaultValues: { type: "SPARE PART", cost: 0 },
  });

  const onSubmit= async (data :WorkFormValues) => {
    try {
      await createSpare(data).unwrap();
      alert("Work created successfully!");
      reset({ type: "SPARE PART", cost: 0 });
    } catch (err) {
      console.error(err);
      alert("Failed to create work.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Work</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

        {loadingProviders ? (
          <p>Loading providers...</p>
        ) : (
          <select
            {...register("providerWorkShopId", { required: "Provider is required" })}
            className="border p-2 rounded"
          >
            <option value="">Select Provider</option>
            {providers?.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        )}
        {errors.providerWorkShopId && (
          <span className="text-red-500">{errors.providerWorkShopId.message}</span>
        )}

        <input
          {...register("type")}
          type="text"
          placeholder="Type"
          className="border p-2 rounded"
        />

        <input
          {...register("code", { required: "Code is required" })}
          type="text"
          placeholder="Code"
          className="border p-2 rounded"
        />
        {errors.code && <span className="text-red-500">{errors.code.message}</span>}

        <input
          {...register("cost", { required: "Cost is required", valueAsNumber: true })}
          type="number"
          placeholder="Cost"
          step="0.01"
          className="border p-2 rounded"
        />
        {errors.cost && <span className="text-red-500">{errors.cost.message}</span>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Work"}
        </button>
      </form>
    </div>
  );
};

export default CreateSpare;
