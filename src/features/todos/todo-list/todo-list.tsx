'use client'

import { useTodoState } from '../todo-context'
import styles from './styles.module.scss'
import { TodoItem } from './todo-item'
import { TodoListProps } from './types'

export const TodoList = ({ ...props }: TodoListProps) => {
  const { todos } = useTodoState()

  return (
    <div className={styles.wrapper} {...props}>
      <h2 className={styles.title}>Todos</h2>
      <div className={styles.listWrapper}>
        {todos ? (
          <ul className={styles.list}>
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <p className={styles.emptyText}>Your todos are empty</p>
        )}
      </div>
    </div>
  )
}
