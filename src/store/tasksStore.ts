import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "../types/Task";

interface TasksStore {
  tasks: Task[];
  filter: "all" | "completed" | "active";
  priority: "all" | "high" | "medium" | "low";
  searchValue: string;
  setSearchValue: (value: string) => void;
  setFilter: (status: "all" | "completed" | "active") => void;
  setPriority: (priority: "all" | "high" | "medium" | "low") => void;
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  editTask: (task: Task) => void;
  toggleCompleted: (id: number) => void;
}

export const useTasksStore = create<TasksStore>()(
  persist(
    (set) => ({
      tasks: [],

      filter: "all",
      priority: "all",
      searchValue: "",

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      removeTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleCompleted: (id: number) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      editTask: (updatedTask: Task) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),

      setFilter: (status) => set(() => ({ filter: status })),

      setPriority: (priorityActive) =>
        set(() => ({ priority: priorityActive })),

      setSearchValue: (value) => set(() => ({ searchValue: value })),
    }),

    {
      name: "tasks-store",
    }
  )
);
