import { userSetup } from '@test-utils'
import { TodoProvider } from '../todo-context'
import { AddTodoForm } from './add-todo-form'

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => jest.fn(),
  },
})

describe('<AddTodoForm>', () => {
  let query: ReturnType<typeof userSetup>

  beforeEach(() => {
    query = userSetup(<AddTodoForm />, { wrapper: TodoProvider })
  })

  it(`should display an error message when the input is empty and submit button should be disabled`, async () => {
    const { user, getByRole, getByText } = query

    const { body } = document
    const input = getByRole('textbox')
    const submitButton = getByRole('button')

    await user.click(input)
    await user.click(body)

    const errorMessage = getByText('This field is required')

    expect(errorMessage).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('should reset form after submission', async () => {
    const { user, getByRole } = query

    const input = getByRole('textbox')
    const submitButton = getByRole('button')

    await user.type(input, 'New Todo')

    expect(input).toHaveValue('New Todo')

    await user.click(submitButton)

    expect(input).toHaveValue('')
  })
})
