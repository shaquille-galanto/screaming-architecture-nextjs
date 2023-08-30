import { Button } from '@features/ui'
import styles from './styles.module.scss'
import type { TodoItemProps } from './types'

export const TodoItem = ({ todo: { text }, ...props }: TodoItemProps) => (
  <li className={styles.item} {...props}>
    <div className={styles.content}>
      <input type="checkbox" />
      <p>{text}</p>
    </div>
    <div className={styles.buttonWrapper}>
      <Button size="sm">Edit</Button>
      <Button variant="secondary" size="sm">
        Delete
      </Button>
    </div>
  </li>
)
