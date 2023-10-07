'use client'

import { Context, createContext, useContext, useReducer } from 'react'
import type { Todo } from '../types'
import { todoReducer } from './todo-reducer'
import type { TodoContextDispatch, TodoContextState, TodoProviderProps } from './types'

export const TodoStateContext = createContext<TodoContextState | null>(
  null,
) as Context<TodoContextState>

export const TodoDispatchContext = createContext<TodoContextDispatch | null>(
  null,
) as Context<TodoContextDispatch>

export const TodoProvider = ({ children, initialTodos }: TodoProviderProps) => {
  const initialState: TodoContextState = {
    todos: initialTodos ?? null,
  }

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const handleAdd = (text: string, id?: string) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: id || crypto.randomUUID(),
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

export const useTodoState = () => {
  const context = useContext(TodoStateContext)

  if (!context) throw new Error('useTodoState must be used within the scope of TodoProvider')

  return context
}

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext)

  if (!context) throw new Error('useTodoDispatch must be used within the scope of TodoProvider')

  return context
}
