import { Dispatch, ReactNode } from 'react'
import type { Todo } from '../types'

export type TodoContextState = {
  todos: Todo[] | null
}

export type TodoContextDispatch = {
  handleAdd: (text: string) => void
  dispatch: Dispatch<TodoReducerAction>
}

export type TodoDispatchActions = {
  ADD: 'ADD'
}

export type AddAction = {
  type: TodoDispatchActions['ADD']
  payload: {
    id: string
    text: string
  }
}

export type TodoReducerAction = AddAction

export type TodoProviderProps = {
  children: ReactNode
}
