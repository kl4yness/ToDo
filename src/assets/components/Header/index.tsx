import styles from "./index.module.css"
import { memo } from "react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="var(--accent)" />
              <path d="M9 16l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>TaskFlow</h1>
            <p className={styles.subtitle}>Организуйте свою продуктивность</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
