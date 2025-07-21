import TodoItem from "../Item/index";
import styles from "./index.module.css";
import { useTasksStore } from "../../../store/tasksStore";
import { memo, useMemo } from "react";

function TodoList() {
  const { toggleCompleted, tasks, filter, priority, searchValue } =
    useTasksStore();

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "active") return !task.completed;
        return true;
      })
      .filter((task) => {
        if (priority === "all") return true;
        return task.priority.toLowerCase() === priority;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
  }, [tasks, filter, priority, searchValue]);

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>Ваши задачи</h2>
        <div className={styles.listStats}>
          <span className={styles.totalTasks}>
            {tasks.length === 1 ? "1 задача" : `${tasks.length} задач`}
          </span>
          <span className={styles.completedTasks}>
            {tasks.filter((task) => task.completed).length} выполнено
          </span>
        </div>
      </div>

      <div className={styles.todoItems}>
        {tasks.length <= 0
          ? "Задач нет, вы молодец!"
          : filteredTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggleCompleted={toggleCompleted}
              />
            ))}
      </div>

      <div className={styles.emptyState} style={{ display: "none" }}>
        <div className={styles.emptyIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default memo(TodoList);
