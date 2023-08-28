import { Context, createContext, useContext, useReducer } from 'react'
import { todoReducer } from './todo-reducer'
import { TodoContextDispatch, TodoContextState, TodoProviderProps } from './types'

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

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={{ handleAdd, dispatch }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export const useTodoState = () => useContext(TodoStateContext)
export const useTodoDispatch = () => useContext(TodoDispatchContext)
