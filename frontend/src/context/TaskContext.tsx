import { createContext, useState, ReactNode } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../services/tasks";
import { Task } from "../types/task";

export interface TaskContextType {
  tasks: Task[];
  createTask: (task: Partial<Task>) => Promise<void>;
  getTasks: () => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTask: (id: string) => Promise<Task>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskRequest(id.toString());
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id: string) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      await updateTaskRequest(id, task);
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
