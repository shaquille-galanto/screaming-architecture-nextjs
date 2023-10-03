import type { TodoContextState, TodoReducerAction } from './types'

export const todoReducer = (state: TodoContextState, action: TodoReducerAction) => {
  const { type, payload } = action
  const { todos } = state

  switch (type) {
    case 'ADD': {
      const { id, text } = payload

      return {
        ...state,
        todos: [
          ...(todos ?? []),
          {
            id,
            text,
            completed: false,
          },
        ],
      }
    }

    case 'EDIT': {
      const { todo } = payload

      const newTodos = todos?.map(item => (item.id === todo.id ? todo : item))

      if (!newTodos) return state

      return {
        ...state,
        todos: newTodos,
      }
    }

    case 'DELETE': {
      const { id } = payload

      const newTodos = todos?.filter(todo => todo.id !== id)

      if (!newTodos) return state

      return {
        ...state,
        todos: newTodos,
      }
    }

    default:
      return state
  }
}
