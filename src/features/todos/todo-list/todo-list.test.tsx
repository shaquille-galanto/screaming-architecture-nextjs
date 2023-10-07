import { render } from '@testing-library/react'
import { TodoProvider } from '../todo-provider'
import { TodoList } from './todo-list'

describe('<TodoList>', () => {
  it('should display a message when todos are empty', () => {
    const { getByText } = render(<TodoList />, { wrapper: TodoProvider })

    const emptyTodos = getByText('Your todos are empty')

    expect(emptyTodos).toBeInTheDocument()
  })

  it('should display the list of todos', () => {
    const initialTodos = [
      { id: 'todo-1', text: 'My first todo', completed: false },
      { id: 'todo-2', text: 'My second todo', completed: false },
    ]

    const { getAllByRole, getByDisplayValue, debug } = render(
      <TodoProvider initialTodos={initialTodos}>
        <TodoList />
      </TodoProvider>,
    )

    const todoElements = getAllByRole('listitem')
    const firstTodo = getByDisplayValue('My first todo')
    const secondTodo = getByDisplayValue('My second todo')

    expect(todoElements).toHaveLength(initialTodos.length)
    expect(firstTodo).toBeInTheDocument()
    expect(secondTodo).toBeInTheDocument()
  })
})
