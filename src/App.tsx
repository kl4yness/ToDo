import Header from "./assets/components/Header/index"
import FilterPanel from "./assets/components/FilterPanel/index"
import List from "./assets/components/List/index"
import Form from "./assets/components/Form/index"
import styles from "./app.module.css"

export default function TodoApp() {
  return (
    <div className={styles.app} data-theme="light">
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Form />
          <FilterPanel />
          <List />
        </main>
      </div>
    </div>
  )
}
