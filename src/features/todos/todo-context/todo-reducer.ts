import { TodoContextState, TodoReducerAction } from './types'

export const todoReducer = (state: TodoContextState, action: TodoReducerAction) => {
  const { type, payload } = action
  const { todos } = state
  const { id, text } = payload

  switch (type) {
    case 'ADD':
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

    default:
      return state
  }
}
