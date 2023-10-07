import { AddTodoForm } from '../../add-todo-form'
import { TodoList } from '../../todo-list'
import styles from './styles.module.scss'
import type { TodoSectionProps } from './types'

export const TodoSection = ({ className, ...props }: TodoSectionProps) => (
  <section className={styles.section} {...props}>
    <div className={styles.container}>
      <AddTodoForm />
      <TodoList />
    </div>
  </section>
)
