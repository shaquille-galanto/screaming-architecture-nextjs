import { render } from '@testing-library/react'
import { TodoProvider, useTodoState } from './todo-context'
import { TodoContextState } from './types'

describe('<TodoProvider>', () => {
  let initialState: TodoContextState = { todos: null }

  const MockComponent = () => {
    const state = useTodoState()

    initialState = state

    return <></>
  }

  it('should store the initialTodos props to its initialState', () => {
    const initialTodos = [{ id: 'todo-1', text: 'My first todo', completed: false }]
    render(
      <TodoProvider initialTodos={initialTodos}>
        <MockComponent />
      </TodoProvider>,
    )

    expect(initialState).toEqual({ todos: initialTodos })
  })
})
