import api from "./axios";
import { Task } from "../types/task";

export const getTasksRequest = () => api.get<Task[]>("/tareas");

export const getTaskRequest = (id: string) => api.get<Task>(`/tareas/${id}`);

export const createTaskRequest = (task: Partial<Task>) => api.post<Task>("/tareas", task);

export const updateTaskRequest = (id: string, task: Partial<Task>) =>
  api.put<Task>(`/tareas/${id}`, task);

export const deleteTaskRequest = (id: string) => api.delete(`/tareas/${id}`);
