import { AddTodoForm, TodoList } from '@features/todos'
import styles from './styles.module.scss'

export const TodoSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <AddTodoForm />
      <TodoList />
    </div>
  </section>
)
