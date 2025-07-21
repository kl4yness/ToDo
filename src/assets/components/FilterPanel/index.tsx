import styles from "./index.module.css";
import { useTasksStore } from "../../../store/tasksStore";
import { memo, useCallback } from "react";

function FilterPanel() {

  const { tasks, setFilter, filter, setPriority, priority, setSearchValue, searchValue } = useTasksStore();
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleFilter = useCallback((filter: "all" | "active" | "completed") => {
    setFilter(filter);
  }, [setFilter]);

  const handlePriority = useCallback((value: "all" | "high" | "medium" | "low") => {
    if (priority === value) {
      setPriority('all');
    } else {
      setPriority(value);
    }
  }, [priority, setPriority]);

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Фильтры</h3>
        <div className={styles.filterButtons}>
          <button
            onClick={() => handleFilter("all")}
            className={`${styles.filterButton} ${
              filter === "all" ? styles.active : ""
            }`}
          >
            Все задачи
            <span className={styles.count}>{tasks.length}</span>
          </button>
          <button
            onClick={() => handleFilter("active")}
            className={`${styles.filterButton} ${
              filter === "active" ? styles.active : ""
            }`}
          >
            Активные
            <span className={styles.count}>{activeTasks.length}</span>
          </button>
          <button
            onClick={() => handleFilter("completed")}
            className={`${styles.filterButton} ${
              filter === "completed" ? styles.active : ""
            }`}
          >
            Выполнены
            <span className={styles.count}>{completedTasks.length}</span>
          </button>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Приоритет</h3>
        <div className={styles.priorityFilters}>
          <button
            onClick={() => handlePriority("high")}
            className={`${styles.priorityButton} ${styles.high} ${
              priority === "high" ? styles.active : ""
            }`}
          >
            <div className={styles.priorityDot}></div>
            Высокий
          </button>
          <button
            onClick={() => handlePriority("medium")}
            className={`${styles.priorityButton} ${styles.medium} ${
              priority === "medium" ? styles.active : ""
            }`}
          >
            <div className={styles.priorityDot}></div>
            Средний
          </button>
          <button
            onClick={() => handlePriority("low")}
            className={`${styles.priorityButton} ${styles.low} ${
              priority === "low" ? styles.active : ""
            }`}
          >
            <div className={styles.priorityDot}></div>
            Низкий
          </button>
        </div>
      </div>

      <div className={styles.searchGroup}>
        <div className={styles.searchInput}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            type="search"
            placeholder="Поиск задач..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(FilterPanel)