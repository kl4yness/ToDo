import { useTasksStore } from "../store/tasksStore";
import type { Task } from "../types/Task";

interface FormValues {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

export const handleSubmitForm = (values: FormValues) => {
  const { addTask } = useTasksStore.getState(); // Важно: getState() для вызова вне компонента

  const newTask: Task = {
    id: Date.now(),
    title: values.title,
    description: values.description,
    completed: false,
    priority: values.priority,
    createdDate: new Date(),
  };

  addTask(newTask);
};
