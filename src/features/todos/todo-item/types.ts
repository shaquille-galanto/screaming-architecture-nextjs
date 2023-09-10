import type { Todo } from '../types'

export type TodoItemProps = OmitNonHTMLAttributes<JSX.IntrinsicElements['li']> & {
  todo: Todo
}
