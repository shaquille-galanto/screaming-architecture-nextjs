'use client'

import { Context, createContext, useContext, useReducer } from 'react'
import { Todo } from '../types'
import { todoReducer } from './todo-reducer'
import type { TodoContextDispatch, TodoContextState, TodoProviderProps } from './types'

const TodoStateContext = createContext<TodoContextState | null>(null) as Context<TodoContextState>
const TodoDispatchContext = createContext<TodoContextDispatch | null>(
  null,
) as Context<TodoContextDispatch>

const initialState: TodoContextState = {
  todos: null,
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const handleAdd = (text: string) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: crypto.randomUUID(),
        text,
      },
    })
  }

  const handleDelete = (id: string) => {
    dispatch({
      type: 'DELETE',
      payload: {
        id,
      },
    })
  }

  const handleEdit = (todo: Todo) => {
    dispatch({
      type: 'EDIT',
      payload: {
        todo,
      },
    })
  }

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={{ handleAdd, handleDelete, handleEdit, dispatch }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export const useTodoState = () => useContext(TodoStateContext)
export const useTodoDispatch = () => useContext(TodoDispatchContext)
