import { useState } from "react";
import styles from "./index.module.css";
import type { Task } from "../../../types/Task";
import { useTasksStore } from "../../../store/tasksStore";
import { memo } from "react";

interface TodoItemProps {
  task: Task;
  onToggleCompleted: (id: number) => void;
}



function TodoItem({ task, onToggleCompleted }: TodoItemProps) {

  const priorityLabels: Record<"Low" | "Medium" | "High", string> = {
  Low: "Низкий",
  Medium: "Средний",
  High: "Высокий",
  };

  const { removeTask, editTask } = useTasksStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const priorityClass = styles[task.priority.toLowerCase()];
  const completedClass = task.completed ? styles.completed : "";

  const handleSave = () => {
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  return (
    <div className={`${styles.todoItem} ${completedClass}`}>
      <div className={styles.todoContent}>
        <div className={styles.todoHeader}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={task.completed}
              onChange={() => onToggleCompleted(task.id)}
            />
            <div className={styles.customCheckbox}>
              <svg
                className={styles.checkIcon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className={styles.todoInfo}>
            {isEditing ? (
              <>
                <input
                  className={styles.editInput}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Название"
                />
                <textarea
                  className={styles.editTextarea}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Описание"
                />
                <select
                  className={styles.editSelect}
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value as "Low" | "Medium" | "High")}
                >
                  <option value="Low">Низкий приоритет</option>
                  <option value="Medium">Средний приоритет</option>
                  <option value="High">Высокий приоритет</option>
                </select>
              </>
            ) : (
              <>
                <h3 className={styles.todoTitle}>{task.title}</h3>
                <p className={styles.todoDescription}>{task.description}</p>
              </>
            )}
          </div>

          <div className={styles.todoMeta}>
            <div className={`${styles.priorityBadge} ${priorityClass}`}>
              <div className={styles.priorityDot}></div>
                {priorityLabels[task.priority]}

            </div>
            <div className={styles.dueDate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {new Date(task.createdDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.todoActions}>
        {isEditing ? (
          <button className={styles.actionButton} onClick={handleSave}>
            Сохранить
          </button>
        ) : (
          <button
            className={styles.actionButton}
            aria-label="Edit task"
            onClick={() => setIsEditing(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        )}
        <button
          className={styles.actionButton}
          aria-label="Delete task"
          onClick={() => removeTask(task.id)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" />
            <path
              d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(TodoItem)

