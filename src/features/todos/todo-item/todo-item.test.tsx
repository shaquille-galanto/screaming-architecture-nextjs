import { userSetup } from '@test-utils'
import { TodoProvider, useTodoState } from '../todo-context'
import { TodoItem } from './todo-item'

describe('<TodoItem>', () => {
  let query: ReturnType<typeof userSetup>

  beforeEach(() => {
    const MockTodoItem = () => {
      const { todos } = useTodoState()

      if (!todos?.length) return null

      return <TodoItem todo={todos[0]} />
    }

    query = userSetup(
      <TodoProvider initialTodos={[{ id: 'todo-1', text: 'My first todo', completed: false }]}>
        <MockTodoItem />
      </TodoProvider>,
    )
  })

  it('should display todo specific details of todo', () => {
    const { getByRole } = query

    const todoInput = getByRole('textbox')

    expect(todoInput).toHaveAttribute('readonly')
    expect(todoInput).toHaveValue('My first todo')
  })

  it('should be able to edit details of todo', async () => {
    const { user, getByRole } = query

    const todoInput = getByRole('textbox')
    const editButton = getByRole('button', { name: 'Edit' })

    await user.click(editButton)

    expect(todoInput).not.toHaveAttribute('readonly')

    await user.clear(todoInput)
    await user.type(todoInput, 'Edited todo')

    const saveButton = getByRole('button', { name: 'Save' })

    await user.click(saveButton)

    expect(todoInput).toHaveValue('Edited todo')
    expect(todoInput).toHaveAttribute('readonly')
  })

  it('should be able to toggle completion of todo', async () => {
    const { user, getByRole } = query

    const completeCheckbox = getByRole('checkbox')

    await user.click(completeCheckbox)

    expect(completeCheckbox).toBeChecked()

    await user.click(completeCheckbox)

    expect(completeCheckbox).not.toBeChecked()
  })

  it('should be able to delete todo', async () => {
    const { user, getByRole } = query

    const todoInput = getByRole('textbox')
    const deleteButton = getByRole('button', { name: 'Delete' })

    await user.click(deleteButton)

    expect(todoInput).not.toBeInTheDocument()
  })
})
