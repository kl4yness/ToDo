import styles from "./index.module.css";
import { useState } from "react";
import { handleSubmitForm } from "../../../service/handleForm";
import { memo } from "react";


function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmitForm({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Добавьте название..."
          className={styles.input}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Добавьте описание..."
          className={styles.input}
        />

        <select
          className={styles.prioritySelect}
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "Low" | "Medium" | "High")
          }
        >
          <option value="Low">Низкий приоритет</option>
          <option value="Medium">Средний приоритет</option>
          <option value="High">Высокий приоритет</option>
        </select>
        <button className={styles.addButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Добавить задачу
        </button>
      </div>
    </form>
  );
}

export default memo(Form)