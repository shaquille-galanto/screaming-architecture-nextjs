import type { TodoContextState, TodoReducerAction } from './types'

export const todoReducer = (state: TodoContextState, action: TodoReducerAction) => {
  const { type, payload } = action
  const { todos } = state
  const { id } = payload

  switch (type) {
    case 'ADD': {
      const { text } = payload

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

    case 'DELETE': {
      const newTodos = todos?.filter(todo => todo.id !== id)

      if (!newTodos) return state

      return {
        ...state,
        todos: newTodos ?? [],
      }
    }

    default:
      return state
  }
}
