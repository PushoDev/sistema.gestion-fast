import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <h1 className="text-3xl font-bold">No tasks yet</h1>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
