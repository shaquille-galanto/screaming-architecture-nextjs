'use client'

import { Button } from '@features/ui'
import { useTodoDispatch } from '../../todo-context'
import styles from './styles.module.scss'
import type { TodoItemProps } from './types'

export const TodoItem = ({ todo: { text, id }, ...props }: TodoItemProps) => {
  const { handleDelete } = useTodoDispatch()

  const onDelete = () => {
    handleDelete(id)
  }

  return (
    <li className={styles.item} {...props}>
      <div className={styles.content}>
        <input type="checkbox" />
        <p>{text}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <Button size="sm">Edit</Button>
        <Button variant="secondary" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </li>
  )
}
