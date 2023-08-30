import { Dispatch, ReactNode } from 'react'
import type { Todo } from '../types'

export type TodoContextState = {
  todos: Todo[] | null
}

export type TodoContextDispatch = {
  handleAdd: (text: string) => void
  handleDelete: (id: string) => void
  dispatch: Dispatch<TodoReducerAction>
}

export type TodoDispatchActions = {
  ADD: 'ADD'
  DELETE: 'DELETE'
}

export type AddAction = {
  type: TodoDispatchActions['ADD']
  payload: {
    id: string
    text: string
  }
}

export type DeleteAction = {
  type: TodoDispatchActions['DELETE']
  payload: {
    id: string
  }
}

export type TodoReducerAction = AddAction | DeleteAction

export type TodoProviderProps = {
  children: ReactNode
}
