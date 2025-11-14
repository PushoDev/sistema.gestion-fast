import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  completed: z.boolean().optional(),
});

type TaskForm = z.infer<typeof taskSchema>;

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          {params.id ? "Edit Task" : "Create Task"}
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <textarea
            rows={3}
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <label className="flex items-center gap-x-2">
            <input type="checkbox" {...register("completed")} />
            <span>Completed</span>
          </label>

          <button
            type="submit"
            className="bg-indigo-500 px-3 py-2 rounded-md mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
